import { Controller, Post, Get, Body, HttpCode, HttpStatus, Req, Res, UseGuards, Optional, Query, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    HandleSocialLoginUseCase,
    GetSocialRegisterInfoUseCase
} from '@virtex/domain-identity-application';
import { Request, Response } from 'express';
import { Public, JwtAuthGuard, SecretManagerService, CookiePolicyService } from '@virtex/kernel-auth';
import { ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SessionGuard } from '../guards/session.guard';
import { RequestContextService } from '../services/request-context.service';

@ApiTags('Auth Social')
@Controller('auth')
@UseGuards(ThrottlerGuard, JwtAuthGuard, SessionGuard)
export class AuthSocialController {
  private readonly logger = new Logger(AuthSocialController.name);

  constructor(
    private readonly handleSocialLoginUseCase: HandleSocialLoginUseCase,
    private readonly getSocialRegisterInfoUseCase: GetSocialRegisterInfoUseCase,
    private readonly requestContextService: RequestContextService,
    private readonly cookiePolicyService: CookiePolicyService,
    @Optional() private readonly secretManager?: SecretManagerService
  ) {}

  @Public()
  @Get('social-register-info')
  async getSocialRegisterInfo(@Query('token') token: string) {
      return this.getSocialRegisterInfoUseCase.execute(token);
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Query('state') state?: string) {
    return this.handleSocialCallback(req, res, state);
  }

  @Public()
  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuth() {
    // Redirects to Microsoft
  }

  @Public()
  @Get('microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Query('state') state?: string) {
    return this.handleSocialCallback(req, res, state);
  }

  @Public()
  @Get('okta')
  @UseGuards(AuthGuard('okta'))
  async oktaAuth() {
    // Redirects to Okta
  }

  @Public()
  @Get('okta/callback')
  @UseGuards(AuthGuard('okta'))
  async oktaAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Query('state') state?: string) {
    return this.handleSocialCallback(req, res, state);
  }

  private async handleSocialCallback(req: Request, res: Response, state?: string) {
    const context = {
        ip: this.requestContextService.extractIp(req),
        userAgent: req.headers['user-agent'] || 'unknown'
    };
    const result = await this.handleSocialLoginUseCase.execute(req.user as any, context);
    this.cookiePolicyService.setAuthCookies(res, result.accessToken!, result.refreshToken!);

    const frontendUrl = this.secretManager?.getSecret('FRONTEND_URL', 'http://localhost:4200');
    const lang = (req.user as any)?.preferredLanguage || 'es';
    let redirectUrl = `${frontendUrl}/${lang}/accounting`;

    if (state) {
        try {
            const decodedState = JSON.parse(Buffer.from(state, 'base64').toString());
            if (decodedState.returnUrl) {
                redirectUrl = `${frontendUrl}${decodedState.returnUrl}`;
            }
        } catch (e) {
            this.logger.error('Failed to parse social login state', e);
        }
    }

    res.redirect(redirectUrl);
  }
}
