import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../shared/services/prisma.service'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesResolver, CategoriesService, PrismaService]
    }).compile()

    resolver = module.get<CategoriesResolver>(CategoriesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
