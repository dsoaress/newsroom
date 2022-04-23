import { NotFoundException } from '@nestjs/common'
import { BadRequestException, Injectable } from '@nestjs/common'
import { hashSync } from 'bcrypt'

import { PrismaService } from '../../shared/services/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email: createUserInput.email }
    })

    if (emailExists) throw new BadRequestException('Email already exists')

    return await this.prismaService.user.create({
      data: {
        ...createUserInput,
        password: hashSync(createUserInput.password, 10)
      }
    })
  }

  async findAll() {
    return await this.prismaService.user.findMany()
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id }
    })

    if (!user) throw new NotFoundException(`User with id ${id} not found`)

    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    await this.findOne(id)

    return await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserInput,
        ...(updateUserInput.password && {
          password: hashSync(updateUserInput.password, 10)
        })
      }
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.prismaService.user.delete({
      where: { id }
    })
  }
}
