import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Image {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
