import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'node:path'

import { CategoriesModule } from './api/categories/categories.module'
import { ImagesModule } from './api/images/images.module'
import { NewsModule } from './api/news/news.module'
import { SessionsModule } from './api/sessions/sessions.module'
import { UsersModule } from './api/users/users.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    CategoriesModule,
    UsersModule,
    NewsModule,
    ImagesModule,
    SessionsModule
  ]
})
export class AppModule {}
