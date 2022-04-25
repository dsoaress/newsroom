import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsDate, IsLowercase, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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
  imageId?: string

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

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  published?: boolean

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  body: string
}
