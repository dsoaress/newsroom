import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../../users/entities/user.entity'

@ObjectType()
export class Session {
  @Field(() => User)
  user: User

  @Field(() => String)
  accessToken: string

  @Field(() => String)
  refreshToken: string
}
