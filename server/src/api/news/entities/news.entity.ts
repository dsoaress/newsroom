import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class News {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
