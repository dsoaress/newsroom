import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ description, name, slug }: CreateCategoryInput) {
    await this.slugExists(slug)

    return await this.prismaService.category.create({
      data: {
        name,
        description,
        slug
      }
    })
  }

  async findAll({ take, skip, search }: { take?: number; skip?: number; search?: string }) {
    const or = search
      ? {
          OR: [
            { name: { contains: search } },
            { slug: { contains: search } },
            { description: { contains: search } }
          ]
        }
      : {}

    return await this.prismaService.category.findMany({
      where: { ...or },
      orderBy: { name: 'asc' },
      take: take || undefined,
      skip: skip || undefined,
      include: { news: { include: { image: true } } }
    })
  }

  async findOne(slug: string) {
    const category = await this.prismaService.category.findUnique({
      where: { slug },
      include: { news: true }
    })

    if (!category) throw new NotFoundException(`Category with slug ${slug} not found`)

    return category
  }

  async update(id: string, { description, name, slug }: UpdateCategoryInput) {
    const category = await this.findOne(id)
    if (slug) await this.slugExists(slug)

    return await this.prismaService.category.update({
      where: { id },
      data: {
        name: name || category.name,
        description: description || category.description,
        slug: slug || category.slug
      }
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.prismaService.category.delete({ where: { id } })
  }

  private async slugExists(slug: string) {
    const slugExists = await this.prismaService.category.findUnique({
      where: { slug }
    })

    if (slugExists) throw new BadRequestException(`Slug ${slug} already exists`)
  }
}
