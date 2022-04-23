import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../shared/services/prisma.service'
import { ImagesResolver } from './images.resolver'
import { ImagesService } from './images.service'

describe('ImagesResolver', () => {
  let resolver: ImagesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesResolver, ImagesService, PrismaService]
    }).compile()

    resolver = module.get<ImagesResolver>(ImagesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
