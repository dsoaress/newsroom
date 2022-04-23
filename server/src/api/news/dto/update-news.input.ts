import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

import { CreateNewsInput } from './create-news.input'

@InputType()
export class UpdateNewsInput extends PartialType(CreateNewsInput) {
  @Field(() => Int)
  id: number
}
