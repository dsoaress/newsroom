import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../shared/services/prisma.service'
import { UsersService } from '../users/users.service'
import { SessionsResolver } from './sessions.resolver'
import { SessionsService } from './sessions.service'

describe('SessionsResolver', () => {
  let resolver: SessionsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '15m' }
        })
      ],
      providers: [SessionsResolver, SessionsService, UsersService, PrismaService]
    }).compile()

    resolver = module.get<SessionsResolver>(SessionsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
