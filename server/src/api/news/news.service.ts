import { BadRequestException } from '@nestjs/common'
import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { CategoriesService } from '../categories/categories.service'
import { ImagesService } from '../images/images.service'
import { CreateNewsInput } from './dto/create-news.input'
import { UpdateNewsInput } from './dto/update-news.input'

@Injectable()
export class NewsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesService: CategoriesService,
    private readonly imagesService: ImagesService
  ) {}

  async create({ body, categoryId, date, description, slug, title, imageId }: CreateNewsInput) {
    await this.slugExists(slug)
    await this.categoriesService.findOne(categoryId)

    return await this.prismaService.news.create({
      data: {
        title,
        description,
        slug,
        date,
        body,
        category: { connect: { id: categoryId } },
        ...(imageId && { image: { connect: { id: imageId } } })
      },
      include: { category: true, image: true }
    })
  }

  async findAll() {
    return await this.prismaService.news.findMany({
      include: { category: true, image: true }
    })
  }

  async findOne(id: string) {
    const news = await this.prismaService.news.findUnique({
      where: { id },
      include: { category: true, image: true }
    })

    if (!news) throw new NotFoundException(`News with id ${id} not found`)

    return news
  }

  async update(
    id: string,
    { body, categoryId, date, description, imageId, slug, title }: UpdateNewsInput
  ) {
    const news = await this.findOne(id)
    if (slug) await this.slugExists(slug)
    if (categoryId) await this.categoriesService.findOne(categoryId)

    return await this.prismaService.news.update({
      where: { id },
      data: {
        title: title || news.title,
        description: description || news.description,
        slug: slug || news.slug,
        date: date || news.date,
        body: body || news.body,
        ...(categoryId && { category: { connect: { id: categoryId } } }),
        ...(imageId && { image: { connect: { id: imageId } } })
      },
      include: { category: true, image: true }
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.prismaService.news.delete({
      where: { id },
      include: { category: true, image: true }
    })
  }

  private async slugExists(slug?: string) {
    const slugExists = await this.prismaService.news.findUnique({
      where: { slug }
    })

    if (slugExists) throw new BadRequestException(`Slug ${slug} already exists`)
  }
}
