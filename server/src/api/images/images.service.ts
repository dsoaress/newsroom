import { Injectable } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'

import { UpdateImageInput } from './dto/update-image.input'

@Injectable()
export class ImagesService {
  create({ createReadStream, filename }: FileUpload) {
    return 'This action adds a new image'
  }

  findAll() {
    return `This action returns all images`
  }

  findOne(id: number) {
    return `This action returns a #${id} image`
  }

  update(id: number, updateImageInput: UpdateImageInput) {
    return `This action updates a #${id} image`
  }

  remove(id: number) {
    return `This action removes a #${id} image`
  }
}
