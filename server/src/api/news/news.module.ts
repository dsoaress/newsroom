import { Module } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { CategoriesService } from '../categories/categories.service'
import { ImagesService } from '../images/images.service'
import { NewsResolver } from './news.resolver'
import { NewsService } from './news.service'

@Module({
  providers: [NewsResolver, NewsService, CategoriesService, ImagesService, PrismaService]
})
export class NewsModule {}
