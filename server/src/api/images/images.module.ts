import { Module } from '@nestjs/common'

import { ImagesResolver } from './images.resolver'
import { ImagesService } from './images.service'

@Module({
  providers: [ImagesResolver, ImagesService]
})
export class ImagesModule {}
