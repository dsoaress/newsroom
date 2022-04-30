import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Role } from '@prisma/client'

registerEnumType(Role, {
  name: 'Role'
})

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => Role)
  role: Role

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
