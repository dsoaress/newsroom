import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => String)
  slug: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
