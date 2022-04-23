import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { PrismaService } from './shared/services/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  })

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.listen(3010).then(() => console.log('Server is running on port 3010'))
}

bootstrap()
