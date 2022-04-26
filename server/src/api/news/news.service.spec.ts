import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../shared/services/prisma.service'
import { CategoriesService } from '../categories/categories.service'
import { ImagesService } from '../images/images.service'
import { NewsService } from './news.service'

describe('NewsService', () => {
  let service: NewsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsService, CategoriesService, ImagesService, PrismaService],
      imports: [ConfigModule]
    }).compile()

    service = module.get<NewsService>(NewsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
