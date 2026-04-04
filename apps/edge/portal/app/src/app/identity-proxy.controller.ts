import {
  Controller,
  Req,
  Res,
  Logger,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  Put,
  Head,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UnauthorizedException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { IdentityProxyService } from './identity-proxy.service';
import { CookiePolicyService } from '@virtex/kernel-auth';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '@virtex/kernel-auth';

@Controller('v1')
export class IdentityProxyController {
  private readonly logger = new Logger(IdentityProxyController.name);

  constructor(
    private readonly identityProxy: IdentityProxyService,
    private readonly cookiePolicy: CookiePolicyService,
  ) {}

  // --- Auth ---

  @Get('auth/me')
  async getMe(@Req() req: Request) {
    const user = (req as any).user;
    return {
      ...user,
      bff_aggregated: true,
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Post('auth/login')
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
  @Post('auth/signup/initiate')
  async initiateSignup(@Body() body: any, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.initiateSignup(body, metadata);
  }

  @Public()
  @Post('auth/signup/verify')
  async verifySignup(@Body() body: any, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.verifySignup(body, metadata);
  }

  @Public()
  @Post('auth/signup/complete')
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
  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google
  }

  @Public()
  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.handleSocialCallback(req, res);
  }

  @Public()
  @Get('auth/microsoft')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuth() {
    // Redirects to Microsoft
  }

  @Public()
  @Get('auth/microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.handleSocialCallback(req, res);
  }

  @Public()
  @Get('auth/okta')
  @UseGuards(AuthGuard('okta'))
  async oktaAuth() {
    // Redirects to Okta
  }

  @Public()
  @Get('auth/okta/callback')
  @UseGuards(AuthGuard('okta'))
  async oktaAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
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
  @Post('auth/verify-mfa')
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
  @Post('auth/refresh')
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

  @Post('auth/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['access_token'];
    const metadata = this.identityProxy.getMetadata(req);
    if (token) {
      await this.identityProxy.logout(token, metadata);
    }
    this.cookiePolicy.clearAuthCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Get('auth/onboarding-status')
  async getOnboardingStatus(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getOnboardingStatus(user.sub, metadata);
  }

  @Public()
  @Post('auth/forgot-password')
  async forgotPassword(@Body() body: any, @Req() req: Request) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.forgotPassword(body, context, metadata);
  }

  @Public()
  @Post('auth/reset-password')
  async resetPassword(@Body() body: any, @Req() req: Request) {
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.resetPassword(body, context, metadata);
  }

  @Public()
  @Post('auth/set-password')
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

  @Get('auth/social-register-info')
  async getSocialRegisterInfo(
    @Query('token') token: string,
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getSocialRegisterInfo(token, metadata);
  }

  @Get('auth/passkey/register-options')
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

  @Post('auth/passkey/register-verify')
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
  @Post('auth/passkey/login-options')
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
  @Post('auth/passkey/login-verify')
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

  @Post('auth/security/context-check')
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

  @Get('auth/sessions')
  async getSessions(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getSessions(user.sub, metadata);
  }

  @Post('auth/sessions/:id/revoke')
  async revokeSession(@Req() req: Request, @Param('id') sessionId: string) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.revokeSession(
      user.sub,
      sessionId,
      metadata,
    );
  }

  @Post('auth/impersonate')
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

  @Post('auth/change-password')
  async changePassword(@Body() body: any, @Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.changePassword(user.sub, body, metadata);
  }

  @Post('auth/2fa/generate')
  async generate2faSecret(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.generate2faSecret(user.sub, metadata);
  }

  @Post('auth/2fa/enable')
  async enable2fa(@Body() body: { token: string }, @Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.enable2fa(user.sub, body.token, metadata);
  }

  @Post('auth/2fa/disable')
  async disable2fa(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.disable2fa(user.sub, metadata);
  }

  @Post('auth/2fa/backup-codes/generate')
  async generateBackupCodes(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.generateBackupCodes(user.sub, metadata);
  }

  @Post('auth/2fa/send-email-verification')
  async sendEmailVerification(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.send2faEmailVerification(
      user.sub,
      metadata,
    );
  }

  @Post('auth/2fa/verify-email-verification')
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

  @Get('auth/location')
  async getLocation(@Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getLocation(req.ip || 'unknown', metadata);
  }

  // --- Users ---

  @Get('users')
  async listUsers(
    @Req() req: Request,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('searchTerm') searchTerm?: string,
    @Query('statusFilter') statusFilter?: string,
    @Query('sortColumn') sortColumn?: string,
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC',
  ) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.listUsers(
      {
        page: Number(page),
        pageSize: Number(pageSize),
        searchTerm,
        statusFilter,
        sortColumn,
        sortDirection,
        tenantId: user?.tenantId,
      },
      metadata,
    );
  }

  @Get('users/job-titles')
  async getJobTitles(@Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getJobTitles(metadata);
  }

  @Get('users/profile')
  async getMyProfile(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getUserProfile(user?.sub, metadata);
  }

  @Get('users/audit-logs')
  async getMyAuditLogs(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getUserAuditLogs(user?.sub, metadata);
  }

  @Patch('users/profile')
  async updateMyProfile(@Req() req: Request, @Body() dto: any) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.updateUserProfile(user?.sub, dto, metadata);
  }

  @Patch('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: any,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.updateUser(
      id,
      dto,
      user.tenantId,
      metadata,
    );
  }

  @Delete('users/:id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.deleteUser(id, user.tenantId, metadata);
  }

  @Post('users/invite')
  async invite(@Req() req: Request, @Body() dto: any) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.inviteUser(dto, user?.sub, metadata);
  }

  @Post('users/:id/force-logout')
  async forceLogout(@Param('id') id: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.forceLogout(id, metadata);
  }

  @Post('users/:id/block-and-logout')
  async blockAndLogout(@Param('id') id: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.blockAndLogout(id, metadata);
  }

  @Put('users/:id/status')
  async setUserStatus(
    @Param('id') id: string,
    @Body() body: { isOnline: boolean },
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.setUserStatus(
      id,
      body.isOnline,
      user.tenantId,
      metadata,
    );
  }

  @Post('users/:id/reset-password')
  async sendPasswordReset(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.sendPasswordReset(
      id,
      user.tenantId,
      context,
      metadata,
    );
  }

  @Post('users/profile/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Req() req: Request, @UploadedFile() file: any) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.uploadAvatar(
      user?.sub,
      file.originalname,
      file.buffer,
      metadata,
    );
  }

  // --- Localization ---

  @Get('localization/config/:code')
  async getConfig(@Param('code') code: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getLocalizationConfig(code, metadata);
  }

  @Get('localization/lookup/:taxId')
  async lookup(
    @Param('taxId') taxId: string,
    @Query('country') country: string,
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.localizationLookup(
      taxId,
      country,
      metadata,
    );
  }

  // --- Common ---

  @Head('common/users/exists')
  @HttpCode(HttpStatus.OK)
  async checkUserExists(@Query('email') email: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.checkUserExists(email, metadata);
    if (!result.exists) throw new NotFoundException('User not found');
  }

  @Head('common/organizations/exists')
  @HttpCode(HttpStatus.OK)
  async checkOrganizationExists(
    @Query('taxId') taxId: string,
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.checkOrganizationExists(
      taxId,
      metadata,
    );
    if (!result.exists) throw new NotFoundException('Organization not found');
  }

  // --- Admin ---

  @Get('admin/tenants')
  async listTenants(@Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.listTenants(metadata);
  }
}
