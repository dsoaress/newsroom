import { Module } from '@nestjs/common'

import { SessionsResolver } from './sessions.resolver'
import { SessionsService } from './sessions.service'

@Module({
  providers: [SessionsResolver, SessionsService]
})
export class SessionsModule {}
