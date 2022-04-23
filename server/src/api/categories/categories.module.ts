import { Module } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'

@Module({
  providers: [CategoriesResolver, CategoriesService, PrismaService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
