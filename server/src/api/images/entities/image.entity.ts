import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Image {
  @Field(() => ID)
  id: string

  @Field(() => String)
  url: string

  @Field(() => String)
  blurDataUrl: string

  @Field(() => Date)
  createdAt: Date
}
