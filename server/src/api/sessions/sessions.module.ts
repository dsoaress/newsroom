import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { PrismaService } from '../../shared/services/prisma.service'
import { UsersService } from '../users/users.service'
import { SessionsResolver } from './sessions.resolver'
import { SessionsService } from './sessions.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', '12345678'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME', '15d')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [SessionsResolver, SessionsService, UsersService, PrismaService],
  exports: [SessionsService]
})
export class SessionsModule {}
