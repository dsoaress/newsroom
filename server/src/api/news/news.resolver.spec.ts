import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../shared/services/prisma.service'
import { CategoriesService } from '../categories/categories.service'
import { ImagesService } from '../images/images.service'
import { NewsResolver } from './news.resolver'
import { NewsService } from './news.service'

describe('NewsResolver', () => {
  let resolver: NewsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsResolver, NewsService, CategoriesService, ImagesService, PrismaService],
      imports: [ConfigModule]
    }).compile()

    resolver = module.get<NewsResolver>(NewsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
