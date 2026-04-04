import {
  Controller,
  Req,
  Res,
  Post,
  Get,
  Body,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { IdentityProxyService } from './identity-proxy.service';
import { CookiePolicyService, Public } from '@virtex/kernel-auth';

@Controller('v1/auth')
export class AuthProxyController {
  constructor(
    private readonly identityProxy: IdentityProxyService,
    private readonly cookiePolicy: CookiePolicyService,
  ) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    const user = (req as any).user;
    return {
      ...user,
      bff_aggregated: true,
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Post('login')
  async login(
    @Body() body: any,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.login(body, context, metadata);

    if (result.mfa_required) {
      return {
        mfaRequired: true,
        tempToken: result.temp_token,
      };
    }

    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
      body.rememberMe,
    );

    const user = await this.identityProxy.getMe(result.access_token, metadata);

    return {
      expiresIn: result.expires_in,
      mfaRequired: false,
      user: {
        id: user.sub,
        email: user.email,
        role: user.role,
        entitlements: user.entitlements || [],
      },
    };
  }

  @Public()
  @Post('signup/initiate')
  async initiateSignup(@Body() body: any, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.initiateSignup(body, metadata);
  }

  @Public()
  @Post('signup/verify')
  async verifySignup(@Body() body: any, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.verifySignup(body, metadata);
  }

  @Public()
  @Post('signup/complete')
  async completeOnboarding(
    @Body() body: any,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.completeOnboarding(
      body,
      context,
      metadata,
    );
    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
    );

    const user = await this.identityProxy.getMe(result.access_token, metadata);

    return {
      expiresIn: result.expires_in,
      user: {
        id: user.sub,
        email: user.email,
        role: user.role,
        entitlements: user.entitlements || [],
      },
    };
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.handleSocialCallback(req, res);
  }

  @Public()
  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuth() {}

  @Public()
  @Get('microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.handleSocialCallback(req, res);
  }

  @Public()
  @Get('okta')
  @UseGuards(AuthGuard('okta'))
  async oktaAuth() {}

  @Public()
  @Get('okta/callback')
  @UseGuards(AuthGuard('okta'))
  async oktaAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.handleSocialCallback(req, res);
  }

  private async handleSocialCallback(req: Request, res: Response) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.handleSocialLogin(
      req.user,
      context,
      metadata,
    );

    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
    );

    const frontendUrl = process.env['FRONTEND_URL'] || 'http://localhost:4200';
    res.redirect(`${frontendUrl}/accounting`);
  }

  @Public()
  @Post('verify-mfa')
  async verifyMfa(
    @Body() body: any,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.verifyMfa(body, context, metadata);
    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
    );

    const user = await this.identityProxy.getMe(result.access_token, metadata);

    return {
      expiresIn: result.expires_in,
      user: {
        id: user.sub,
        email: user.email,
        role: user.role,
        entitlements: user.entitlements || [],
      },
    };
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'] || req.body.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.refreshToken(
      refreshToken,
      context,
      metadata,
    );
    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
    );

    const user = await this.identityProxy.getMe(result.access_token, metadata);

    return {
      expiresIn: result.expires_in,
      user: {
        id: user.sub,
        email: user.email,
        role: user.role,
        entitlements: user.entitlements || [],
      },
    };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['access_token'];
    const metadata = this.identityProxy.getMetadata(req);
    if (token) {
      await this.identityProxy.logout(token, metadata);
    }
    this.cookiePolicy.clearAuthCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Get('onboarding-status')
  async getOnboardingStatus(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getOnboardingStatus(user.sub, metadata);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() body: any, @Req() req: Request) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.forgotPassword(body, context, metadata);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: any, @Req() req: Request) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.resetPassword(body, context, metadata);
  }

  @Public()
  @Post('set-password')
  async setPassword(
    @Body() body: any,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.setPassword(
      body,
      context,
      metadata,
    );
    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
    );

    const user = await this.identityProxy.getMe(result.access_token, metadata);

    return {
      expiresIn: result.expires_in,
      user: {
        id: user.sub,
        email: user.email,
        role: user.role,
        entitlements: user.entitlements || [],
      },
    };
  }

  @Get('social-register-info')
  async getSocialRegisterInfo(
    @Query('token') token: string,
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getSocialRegisterInfo(token, metadata);
  }

  @Get('passkey/register-options')
  async passkeyRegisterOptions(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    const options = await this.identityProxy.getPasskeyRegisterOptions(
      user.sub,
      metadata,
    );
    (req as any).session.registrationOptions = JSON.parse(options.options_json);
    return options;
  }

  @Post('passkey/register-verify')
  async passkeyRegisterVerify(@Body() body: any, @Req() req: Request) {
    const user = (req as any).user;
    const currentOptions = (req as any).session.registrationOptions;
    const metadata = this.identityProxy.getMetadata(req);
    await this.identityProxy.verifyPasskeyRegister(
      user.sub,
      currentOptions,
      body,
      metadata,
    );
    delete (req as any).session.registrationOptions;
    return { success: true };
  }

  @Public()
  @Post('passkey/login-options')
  async passkeyLoginOptions(
    @Body() body: { email?: string },
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    const options = await this.identityProxy.getPasskeyLoginOptions(
      body.email,
      metadata,
    );
    (req as any).session.loginOptions = JSON.parse(options.options_json);
    return options;
  }

  @Public()
  @Post('passkey/login-verify')
  async passkeyLoginVerify(
    @Body() body: any,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const currentOptions = (req as any).session.loginOptions;
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.verifyPasskeyLogin(
      body,
      currentOptions,
      context,
      metadata,
    );
    delete (req as any).session.loginOptions;
    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
    );
    return {
      expiresIn: result.expires_in,
    };
  }

  @Post('security/context-check')
  async checkContext(
    @Body() body: { urlCountry: string },
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.checkSecurityContext(
      body.urlCountry,
      req.ip || 'unknown',
      metadata,
    );
  }

  @Get('sessions')
  async getSessions(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getSessions(user.sub, metadata);
  }

  @Post('sessions/:id/revoke')
  async revokeSession(@Req() req: Request, @Param('id') sessionId: string) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.revokeSession(
      user.sub,
      sessionId,
      metadata,
    );
  }

  @Post('impersonate')
  async impersonate(
    @Body() body: { userId: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const adminUser = (req as any).user;
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.impersonate(
      adminUser.sub,
      body.userId,
      context,
      metadata,
    );
    this.cookiePolicy.setAuthCookies(
      res,
      result.access_token,
      result.refresh_token,
    );
    return {
      expiresIn: result.expires_in,
    };
  }

  @Post('change-password')
  async changePassword(@Body() body: any, @Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.changePassword(user.sub, body, metadata);
  }

  @Post('2fa/generate')
  async generate2faSecret(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.generate2faSecret(user.sub, metadata);
  }

  @Post('2fa/enable')
  async enable2fa(@Body() body: { token: string }, @Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.enable2fa(user.sub, body.token, metadata);
  }

  @Post('2fa/disable')
  async disable2fa(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.disable2fa(user.sub, metadata);
  }

  @Post('2fa/backup-codes/generate')
  async generateBackupCodes(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.generateBackupCodes(user.sub, metadata);
  }

  @Post('2fa/send-email-verification')
  async sendEmailVerification(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.send2faEmailVerification(
      user.sub,
      metadata,
    );
  }

  @Post('2fa/verify-email-verification')
  async verifyEmailVerification(
    @Body() body: { code: string },
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.verify2faEmailVerification(
      user.sub,
      body.code,
      metadata,
    );
  }

  @Get('location')
  async getLocation(@Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getLocation(req.ip || 'unknown', metadata);
  }
}
