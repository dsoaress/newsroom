import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateNewsInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
