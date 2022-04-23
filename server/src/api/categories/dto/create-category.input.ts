import { Field, InputType } from '@nestjs/graphql'
import { IsLowercase, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string

  @IsNotEmpty()
  @IsLowercase()
  @Field(() => String)
  slug: string
}
