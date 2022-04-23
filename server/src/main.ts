import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  })

  app.listen(3010).then(() => console.log('Server is running on port 3010'))
}

bootstrap()
