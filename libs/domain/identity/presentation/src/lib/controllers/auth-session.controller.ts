import { Controller, Post, Get, Body, HttpCode, HttpStatus, Req, Res, UnauthorizedException, UseGuards, Param, Logger } from '@nestjs/common';
import {
    LoginUserUseCase,
    RefreshTokenUseCase,
    LogoutUserUseCase,
    GetSessionsUseCase,
    RevokeSessionUseCase,
    ImpersonateUserUseCase,
    CheckSecurityContextUseCase,
    GetUserProfileUseCase
} from '@virtex/domain-identity-application';
import {
    LoginUserDto,
    RefreshTokenDto
} from '@virtex/domain-identity-contracts';
import { Request, Response } from 'express';
import { Public, JwtAuthGuard, CookiePolicyService } from '@virtex/kernel-auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { SessionGuard } from '../guards/session.guard';
import { RequestContextService } from '../services/request-context.service';

@ApiTags('Auth Session')
@Controller('auth')
@UseGuards(ThrottlerGuard, JwtAuthGuard, SessionGuard)
export class AuthSessionController {
  private readonly logger = new Logger(AuthSessionController.name);

  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
    private readonly getSessionsUseCase: GetSessionsUseCase,
    private readonly revokeSessionUseCase: RevokeSessionUseCase,
    private readonly impersonateUserUseCase: ImpersonateUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly requestContextService: RequestContextService,
    private readonly cookiePolicyService: CookiePolicyService
  ) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const context = {
      ip: this.requestContextService.extractIp(req),
      userAgent: req.headers['user-agent'] || 'unknown'
    };
    const result = await this.loginUserUseCase.execute(dto, context);

    if (result.mfaRequired) {
        return {
            mfaRequired: true,
            tempToken: result.tempToken
        };
    }

    this.cookiePolicyService.setAuthCookies(res, result.accessToken!, result.refreshToken!, dto.rememberMe);

    return {
        expiresIn: result.expiresIn,
        mfaRequired: false
    };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
        throw new UnauthorizedException('No refresh token found in cookies');
    }

    const context = {
        ip: this.requestContextService.extractIp(req),
        userAgent: req.headers['user-agent'] || 'unknown'
    };

    const dto: RefreshTokenDto = { refreshToken };
    const result = await this.refreshTokenUseCase.execute(dto, context);

    this.cookiePolicyService.setAuthCookies(res, result.accessToken!, result.refreshToken!);

    return {
        expiresIn: result.expiresIn
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
      this.cookiePolicyService.clearAuthCookies(res);

      const user = (req as any).user;
      if (user && user.sessionId) {
          await this.logoutUserUseCase.execute(user.sessionId);
      }

      return { message: 'Logged out successfully' };
  }

  @Get('me')
  async getMe(@Req() req: Request) {
      return (req as any).user;
  }

  @Get('sessions')
  async getSessions(@Req() req: Request) {
      const user = (req as any).user;
      return this.getSessionsUseCase.execute(user.sub);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sessions/:id/revoke')
  async revokeSession(@Req() req: Request, @Param('id') sessionId: string) {
      const user = (req as any).user;
      return this.revokeSessionUseCase.execute(user.sub, sessionId);
  }

  @Post('impersonate')
  @HttpCode(HttpStatus.OK)
  async impersonate(@Body() body: { userId: string }, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
      const adminUser = (req as any).user;
      const context = {
          ip: this.requestContextService.extractIp(req),
          userAgent: req.headers['user-agent'] || 'unknown'
      };
      const result = await this.impersonateUserUseCase.execute(adminUser.sub, body.userId, context);
      this.cookiePolicyService.setAuthCookies(res, result.accessToken, result.refreshToken);
      return {
          expiresIn: result.expiresIn
      };
  }
}
