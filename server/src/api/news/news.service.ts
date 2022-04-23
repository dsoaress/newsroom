import { BadRequestException } from '@nestjs/common'
import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { CreateNewsInput } from './dto/create-news.input'
import { UpdateNewsInput } from './dto/update-news.input'

@Injectable()
export class NewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNewsInput: CreateNewsInput) {
    const slugExists = await this.prismaService.news.findUnique({
      where: { slug: createNewsInput.slug }
    })

    if (slugExists) throw new BadRequestException(`Slug ${createNewsInput.slug} already exists`)

    return await this.prismaService.news.create({
      data: createNewsInput,
      include: { category: true }
    })
  }

  async findAll() {
    return await this.prismaService.news.findMany({ include: { category: true } })
  }

  async findOne(id: string) {
    const news = await this.prismaService.news.findUnique({
      where: { id },
      include: { category: true }
    })

    if (!news) throw new NotFoundException(`News with id ${id} not found`)

    return news
  }

  async update(id: string, updateNewsInput: UpdateNewsInput) {
    await this.findOne(id)

    return await this.prismaService.news.update({
      where: { id },
      data: updateNewsInput,
      include: { category: true }
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.prismaService.news.delete({ where: { id }, include: { category: true } })
  }
}
