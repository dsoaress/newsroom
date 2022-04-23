import { Module } from '@nestjs/common'

import { NewsResolver } from './news.resolver'
import { NewsService } from './news.service'

@Module({
  providers: [NewsResolver, NewsService]
})
export class NewsModule {}
