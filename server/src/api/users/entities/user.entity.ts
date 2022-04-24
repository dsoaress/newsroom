import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Role } from '@prisma/client'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  role: Role

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
