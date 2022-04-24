import { Field, InputType } from '@nestjs/graphql'
import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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

  @IsEnum(Role)
  @IsOptional()
  @Field(() => String, { nullable: true })
  role?: Role
}
