import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

import { Image } from './entities/image.entity'
import { ImagesService } from './images.service'

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => Image)
  createImage(
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload
  ) {
    return this.imagesService.create(file)
  }

  @Query(() => [Image], { name: 'images' })
  findAll() {
    return this.imagesService.findAll()
  }

  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.imagesService.findOne(id)
  }

  @Mutation(() => Image)
  removeImage(@Args('id', { type: () => String }) id: string) {
    return this.imagesService.remove(id)
  }
}
