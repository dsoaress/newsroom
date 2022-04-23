import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsLowercase, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateNewsInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  title: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  image?: string

  @IsNotEmpty()
  @IsLowercase()
  @Field(() => String)
  slug: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  categoryId: string

  @IsDate()
  @IsNotEmpty()
  @Field(() => Date)
  date: Date

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  body: string
}
