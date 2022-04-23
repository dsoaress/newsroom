import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../shared/services/prisma.service'
import { ImagesService } from './images.service'

describe('ImagesService', () => {
  let service: ImagesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesService, PrismaService]
    }).compile()

    service = module.get<ImagesService>(ImagesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
