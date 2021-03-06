import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { graphqlUploadExpress } from 'graphql-upload'

import { AppModule } from './app.module'
import { PrismaService } from './shared/services/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.enableCors()
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      whitelist: true
    })
  )

  app.listen(3010).then(() => console.log('Server is running on port 3010'))
}

bootstrap()
