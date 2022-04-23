import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const slugExists = await this.prismaService.category.findUnique({
      where: { slug: createCategoryInput.slug }
    })

    if (slugExists) throw new BadRequestException(`Slug ${createCategoryInput.slug} already exists`)

    return await this.prismaService.category.create({ data: createCategoryInput })
  }

  async findAll() {
    return await this.prismaService.category.findMany()
  }

  async findOne(id: string) {
    const category = await this.prismaService.category.findUnique({ where: { id } })

    if (!category) throw new NotFoundException(`Category with id ${id} not found`)

    return category
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    await this.findOne(id)

    return await this.prismaService.category.update({
      where: { id },
      data: updateCategoryInput
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.prismaService.category.delete({ where: { id } })
  }
}
