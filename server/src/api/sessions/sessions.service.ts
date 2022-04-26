import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import dayjs from 'dayjs'

import { PrismaService } from '../../shared/services/prisma.service'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateSessionInput } from './dto/create-session.input'

@Injectable()
export class SessionsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser({ email, password }: CreateSessionInput) {
    const user = await this.usersService.findOneByEmail(email)

    if (!user) throw new UnauthorizedException('Invalid credentials')

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  async create({ email, password }: CreateSessionInput) {
    const user = await this.validateUser({ email, password })
    return await this.createSession(user)
  }

  async update(refreshToken: string) {
    const session = await this.prismaService.session.findUnique({
      where: { id: refreshToken }
    })

    if (!session) throw new UnauthorizedException('Invalid credentials')

    const user = await this.usersService.findOne(session.userId)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const hasExpired = dayjs().isAfter(session.expiresAt)
    if (hasExpired) {
      await this.removeSession(refreshToken)
      throw new UnauthorizedException('Refresh token has expired')
    }

    await this.removeSession(refreshToken)
    return await this.createSession(user)
  }

  async validateAccessToken(accessToken: string) {
    const { sub } = this.jwtService.verify(accessToken) as { sub: string }
    const user = await this.usersService.findOne(sub)

    if (!user) return { isValid: false }
    return { user, isValid: true }
  }

  isPreviewMode(tokenToCompare?: string) {
    const previewModeToken = this.configService.get('PREVIEW_MODE_TOKEN')

    if (!previewModeToken || !tokenToCompare || tokenToCompare !== previewModeToken) {
      return false
    }

    return true
  }

  private async createSession(user: User) {
    const session = await this.prismaService.session.create({
      data: {
        userId: user.id,
        expiresAt: dayjs().add(30, 'days').toDate()
      }
    })

    const payload = { sub: user.id, role: user.role }
    const accessToken = this.jwtService.sign(payload)
    const { id: refreshToken } = session

    return { user, accessToken, refreshToken }
  }

  private async removeSession(refreshToken: string) {
    await this.prismaService.session.delete({
      where: { id: refreshToken }
    })
  }
}
