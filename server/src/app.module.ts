import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { join } from 'node:path'

import { CategoriesModule } from './api/categories/categories.module'
import { ImagesModule } from './api/images/images.module'
import { NewsModule } from './api/news/news.module'
import { SessionsModule } from './api/sessions/sessions.module'
import { UsersModule } from './api/users/users.module'
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard'
import { RolesGuard } from './shared/guards/roles.guard'
import { PrismaService } from './shared/services/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', '12345678'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME', '15m')
        }
      }),
      inject: [ConfigService]
    }),
    CategoriesModule,
    UsersModule,
    NewsModule,
    ImagesModule,
    SessionsModule
  ],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule {}
