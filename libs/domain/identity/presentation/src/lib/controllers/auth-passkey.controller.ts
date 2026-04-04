import { Controller, Post, Get, Body, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
    GeneratePasskeyRegistrationOptionsUseCase,
    VerifyPasskeyRegistrationUseCase,
    GeneratePasskeyLoginOptionsUseCase,
    VerifyPasskeyLoginUseCase
} from '@virtex/domain-identity-application';
import { Request, Response } from 'express';
import { Public, JwtAuthGuard, CookiePolicyService } from '@virtex/kernel-auth';
import { ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SessionGuard } from '../guards/session.guard';
import { RequestContextService } from '../services/request-context.service';

@ApiTags('Auth Passkey')
@Controller('auth')
@UseGuards(ThrottlerGuard, JwtAuthGuard, SessionGuard)
export class AuthPasskeyController {
  constructor(
    private readonly generatePasskeyRegistrationOptionsUseCase: GeneratePasskeyRegistrationOptionsUseCase,
    private readonly verifyPasskeyRegistrationUseCase: VerifyPasskeyRegistrationUseCase,
    private readonly generatePasskeyLoginOptionsUseCase: GeneratePasskeyLoginOptionsUseCase,
    private readonly verifyPasskeyLoginUseCase: VerifyPasskeyLoginUseCase,
    private readonly requestContextService: RequestContextService,
    private readonly cookiePolicyService: CookiePolicyService
  ) {}

  @Get('passkey/register-options')
  async passkeyRegisterOptions(@Req() req: Request) {
      const user = (req as any).user;
      const options = await this.generatePasskeyRegistrationOptionsUseCase.execute(user.sub);
      (req as any).session.registrationOptions = options;
      return options;
  }

  @Post('passkey/register-verify')
  async passkeyRegisterVerify(@Body() body: any, @Req() req: Request) {
      const user = (req as any).user;
      const currentOptions = (req as any).session.registrationOptions;
      if (!currentOptions) throw new UnauthorizedException('Registration options not found in session');

      const result = await this.verifyPasskeyRegistrationUseCase.execute(user.sub, currentOptions, body);
      delete (req as any).session.registrationOptions;
      return result;
  }

  @Public()
  @Post('passkey/login-options')
  async passkeyLoginOptions(@Body() body: { email?: string }, @Req() req: Request) {
      const options = await this.generatePasskeyLoginOptionsUseCase.execute(body.email);
      (req as any).session.loginOptions = { ...options, userEmail: body.email };
      return options;
  }

  @Public()
  @Post('passkey/login-verify')
  async passkeyLoginVerify(@Body() body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
      const currentOptions = (req as any).session.loginOptions;
      if (!currentOptions) throw new UnauthorizedException('Login options not found in session');

      const context = {
          ip: this.requestContextService.extractIp(req),
          userAgent: req.headers['user-agent'] || 'unknown'
      };

      const result = await this.verifyPasskeyLoginUseCase.execute(body, currentOptions, context);
      delete (req as any).session.loginOptions;

      this.cookiePolicyService.setAuthCookies(res, result.accessToken!, result.refreshToken!);
      return {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          expiresIn: result.expiresIn,
          mfaRequired: false
      };
  }
}
