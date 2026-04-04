import { Controller, Post, Body, HttpCode, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import {
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    SetPasswordUseCase,
    ChangePasswordUseCase
} from '@virtex/domain-identity-application';
import {
    ForgotPasswordDto,
    ResetPasswordDto,
    SetPasswordDto,
    ChangePasswordDto
} from '@virtex/domain-identity-contracts';
import { Request, Response } from 'express';
import { Public, JwtAuthGuard, CookiePolicyService } from '@virtex/kernel-auth';
import { ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { SessionGuard } from '../guards/session.guard';
import { RequestContextService } from '../services/request-context.service';

@ApiTags('Auth Recovery')
@Controller('auth')
@UseGuards(ThrottlerGuard, JwtAuthGuard, SessionGuard)
export class AuthRecoveryController {
  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly setPasswordUseCase: SetPasswordUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly requestContextService: RequestContextService,
    private readonly cookiePolicyService: CookiePolicyService
  ) {}

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Req() req: Request) {
      const context = {
          ip: this.requestContextService.extractIp(req),
          userAgent: req.headers['user-agent'] || 'unknown'
      };
      await this.forgotPasswordUseCase.execute(dto, context);
      return { message: 'If the email exists, a reset link has been sent.' };
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto, @Req() req: Request) {
      const context = {
          ip: this.requestContextService.extractIp(req),
          userAgent: req.headers['user-agent'] || 'unknown'
      };
      await this.resetPasswordUseCase.execute(dto, context);
      return { message: 'Password has been reset successfully.' };
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  async setPassword(@Body() dto: SetPasswordDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
      const context = {
          ip: this.requestContextService.extractIp(req),
          userAgent: req.headers['user-agent'] || 'unknown'
      };
      const result = await this.setPasswordUseCase.execute(dto, context);

      this.cookiePolicyService.setAuthCookies(res, result.accessToken!, result.refreshToken!);

      return {
          expiresIn: result.expiresIn,
          mfaRequired: false
      };
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request) {
      const user = (req as any).user;
      await this.changePasswordUseCase.execute(user.sub, dto);
      return { message: 'Password changed successfully' };
  }
}
