import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Category } from '../../categories/entities/category.entity'

@ObjectType()
export class News {
  @Field(() => ID)
  id: string

  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String)
  slug: string

  @Field(() => Category)
  category: Category

  @Field(() => Date)
  date: Date

  @Field(() => String)
  body: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
