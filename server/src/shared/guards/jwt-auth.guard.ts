import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { SessionsService } from '../../api/sessions/sessions.service'
import { IS_PUBLIC_KEY } from '../decorators/public-route.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly sessionService: SessionsService
  ) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    return { req, ctx }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, ctx } = this.getRequest(context)
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ])

    const authHeader = req.headers.authorization as string
    const previewModeToken = req.headers.preview as string
    req.preview = this.sessionService.isPreviewMode(previewModeToken)

    if (isPublic && !authHeader) return true
    req.user = await this.sessionService.validateAccessToken(authHeader)

    return true
  }
}
