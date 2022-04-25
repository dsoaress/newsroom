import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Category } from '../../categories/entities/category.entity'
import { Image } from '../../images/entities/image.entity'

@ObjectType()
export class News {
  @Field(() => ID)
  id: string

  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

  @Field(() => Image, { nullable: true })
  image?: Image

  @Field(() => String)
  slug: string

  @Field(() => Category)
  category: Category

  @Field(() => Date)
  date: Date

  @Field(() => Boolean)
  published: boolean

  @Field(() => String)
  body: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
