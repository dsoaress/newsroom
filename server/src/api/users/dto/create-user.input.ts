import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  password: string
}
