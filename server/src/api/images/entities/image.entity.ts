import { Field, ID, ObjectType } from '@nestjs/graphql'

import { News } from '../../news/entities/news.entity'

@ObjectType()
export class Image {
  @Field(() => ID)
  id: string

  @Field(() => String)
  url: string

  @Field(() => [News])
  news: News[]

  @Field(() => Date)
  createdAt: Date
}
