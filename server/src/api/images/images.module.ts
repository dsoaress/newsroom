import { Module } from '@nestjs/common'

import { PrismaService } from '../../shared/services/prisma.service'
import { ImagesResolver } from './images.resolver'
import { ImagesService } from './images.service'

@Module({
  providers: [ImagesResolver, ImagesService, PrismaService],
  exports: [ImagesService]
})
export class ImagesModule {}
