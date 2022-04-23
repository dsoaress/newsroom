import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Image } from '../../images/entities/image.entity'
import { News } from '../../news/entities/news.entity'

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => Image, { nullable: true })
  image?: Image

  @Field(() => String)
  slug: string

  @Field(() => [News])
  news: News[]

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
