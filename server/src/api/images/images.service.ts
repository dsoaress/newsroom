import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UploadClient } from '@uploadcare/upload-client'
import { FileUpload } from 'graphql-upload'
import { getPlaiceholder } from 'plaiceholder'

import { PrismaService } from '../../shared/services/prisma.service'

@Injectable()
export class ImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private uploadCareClient = new UploadClient({
    publicKey: this.configService.get('UPLOADCARE_PUBLIC_KEY')
  })

  async create({ createReadStream, filename, mimetype }: FileUpload) {
    const stream = createReadStream()
    const chunks = []

    try {
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer

        stream.on('data', chunk => {
          chunks.push(chunk)
        })

        stream.on('end', () => {
          buffer = Buffer.concat(chunks)
          resolve(buffer)
        })

        stream.on('error', reject)
      })

      const { base64: blurDataUrl } = await getPlaiceholder(buffer, { size: 10 })
      const { cdnUrl: url } = await this.uploadCareClient.uploadFile(buffer, {
        fileName: filename,
        contentType: mimetype
      })

      if (!url) throw new BadGatewayException('Upload to uploadcare failed')

      return await this.prismaService.image.create({
        data: { url, blurDataUrl }
      })
    } catch (error) {
      throw new BadGatewayException(error)
    }
  }

  async findAll() {
    return await this.prismaService.image.findMany()
  }

  async findOne(id: string) {
    const image = await this.prismaService.image.findUnique({ where: { id } })

    if (!image) throw new NotFoundException(`Image with id ${id} not found`)

    return image
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.prismaService.image.delete({ where: { id } })
  }
}
