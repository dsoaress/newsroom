import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { Public } from '../../shared/decorators/public-route.decorator'
import { CreateSessionInput } from './dto/create-session.input'
import { Session } from './entities/session.entity'
import { SessionsService } from './sessions.service'

@Resolver(() => Session)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Public()
  @Mutation(() => Session)
  createSession(@Args('createSessionInput') createSessionInput: CreateSessionInput) {
    return this.sessionsService.create(createSessionInput)
  }

  @Public()
  @Mutation(() => Session)
  updateSession(@Args('refreshToken') refreshToken: string) {
    return this.sessionsService.update(refreshToken)
  }
}
