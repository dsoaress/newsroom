import { Module } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { NewsResolver } from './news.resolver'
import { NewsService } from './news.service'

@Module({
  providers: [NewsResolver, NewsService, PrismaService]
})
export class NewsModule {}
