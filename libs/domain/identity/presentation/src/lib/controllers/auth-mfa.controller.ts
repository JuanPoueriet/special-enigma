import { Controller, Post, Body, HttpCode, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import {
    VerifyMfaUseCase,
    SetupMfaUseCase,
    ConfirmMfaUseCase,
    Disable2faUseCase,
    GenerateBackupCodesUseCase,
    Send2faEmailVerificationUseCase,
    Verify2faEmailVerificationUseCase
} from '@virtex/domain-identity-application';
import {
    VerifyMfaDto
} from '@virtex/domain-identity-contracts';
import { Request, Response } from 'express';
import { Public, JwtAuthGuard, CookiePolicyService } from '@virtex/kernel-auth';
import { ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { SessionGuard } from '../guards/session.guard';
import { RequestContextService } from '../services/request-context.service';

@ApiTags('Auth MFA')
@Controller('auth')
@UseGuards(ThrottlerGuard, JwtAuthGuard, SessionGuard)
export class AuthMfaController {
  constructor(
    private readonly verifyMfaUseCase: VerifyMfaUseCase,
    private readonly setupMfaUseCase: SetupMfaUseCase,
    private readonly confirmMfaUseCase: ConfirmMfaUseCase,
    private readonly disable2faUseCase: Disable2faUseCase,
    private readonly generateBackupCodesUseCase: GenerateBackupCodesUseCase,
    private readonly send2faEmailVerificationUseCase: Send2faEmailVerificationUseCase,
    private readonly verify2faEmailVerificationUseCase: Verify2faEmailVerificationUseCase,
    private readonly requestContextService: RequestContextService,
    private readonly cookiePolicyService: CookiePolicyService
  ) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('verify-mfa')
  @HttpCode(HttpStatus.OK)
  async verifyMfa(@Body() dto: VerifyMfaDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const context = {
        ip: this.requestContextService.extractIp(req),
        userAgent: req.headers['user-agent'] || 'unknown'
    };
    const result = await this.verifyMfaUseCase.execute(dto, context);

    this.cookiePolicyService.setAuthCookies(res, result.accessToken!, result.refreshToken!);

    return {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
        mfaRequired: false
    };
  }

  @Post('2fa/generate')
  async generate2faSecret(@Req() req: Request) {
      const user = (req as any).user;
      return this.setupMfaUseCase.execute(user.sub);
  }

  @Post('2fa/enable')
  async enable2fa(@Body() body: { token: string }, @Req() req: Request) {
      const user = (req as any).user;
      const success = await this.confirmMfaUseCase.execute(user.sub, body.token);

      let backupCodes: string[] = [];
      if (success) {
          const result = await this.generateBackupCodesUseCase.execute(user.sub);
          backupCodes = result.codes;
      }

      return { success, backupCodes };
  }

  @Post('2fa/disable')
  async disable2fa(@Req() req: Request) {
      const user = (req as any).user;
      await this.disable2faUseCase.execute(user.sub);
      return { message: '2FA disabled' };
  }

  @Post('2fa/backup-codes/generate')
  async generateBackupCodes(@Req() req: Request) {
      const user = (req as any).user;
      return this.generateBackupCodesUseCase.execute(user.sub);
  }

  @Post('2fa/send-email-verification')
  async sendEmailVerification(@Req() req: Request) {
      const user = (req as any).user;
      await this.send2faEmailVerificationUseCase.execute(user.sub);
      return { message: 'Verification email sent' };
  }

  @Post('2fa/verify-email-verification')
  async verifyEmailVerification(@Body() body: { code: string }, @Req() req: Request) {
      const user = (req as any).user;
      await this.verify2faEmailVerificationUseCase.execute(user.sub, body.code);
      return { message: 'Email verified' };
  }
}
