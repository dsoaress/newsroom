import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../shared/services/prisma.service'
import { UsersService } from '../users/users.service'
import { SessionsService } from './sessions.service'

describe('SessionsService', () => {
  let service: SessionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '15m' }
        }),
        ConfigModule
      ],
      providers: [SessionsService, UsersService, PrismaService]
    }).compile()

    service = module.get<SessionsService>(SessionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
