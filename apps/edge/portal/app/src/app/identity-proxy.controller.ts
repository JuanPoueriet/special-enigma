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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { IdentityProxyService } from './identity-proxy.service';
import { CookiePolicyService } from '@virtex/domain-identity-presentation';

@Controller('v1')
export class IdentityProxyController {
  private readonly logger = new Logger(IdentityProxyController.name);

  constructor(
    private readonly identityProxy: IdentityProxyService,
    private readonly cookiePolicy: CookiePolicyService
  ) {}

  // --- Auth ---

  @Get('auth/me')
  async getMe(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies['access_token']) {
      token = req.cookies['access_token'];
    }

    if (token) {
      const user = await this.identityProxy.getMe(token);
      return {
        ...user,
        bff_aggregated: true,
        timestamp: new Date().toISOString(),
      };
    }
    throw new UnauthorizedException();
  }

  @Post('auth/login')
  async login(@Body() body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const context = this.identityProxy.buildContext(req);
    const result = await this.identityProxy.login(body, context);

    if (!result.mfa_required) {
      this.cookiePolicy.setAuthCookies(res, result.access_token, result.refresh_token, body.rememberMe);
    }

    return result;
  }

  @Post('auth/signup/initiate')
  async initiateSignup(@Body() body: any) {
    return await this.identityProxy.initiateSignup(body);
  }

  @Post('auth/signup/verify')
  async verifySignup(@Body() body: any) {
    return await this.identityProxy.verifySignup(body);
  }

  @Post('auth/signup/complete')
  async completeOnboarding(@Body() body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const context = this.identityProxy.buildContext(req);
    const result = await this.identityProxy.completeOnboarding(body, context);
    this.cookiePolicy.setAuthCookies(res, result.access_token, result.refresh_token);
    return result;
  }

  @Post('auth/verify-mfa')
  async verifyMfa(@Body() body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const context = this.identityProxy.buildContext(req);
    const result = await this.identityProxy.verifyMfa(body, context);
    this.cookiePolicy.setAuthCookies(res, result.access_token, result.refresh_token);
    return result;
  }

  @Post('auth/refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'] || req.body.refreshToken;
    const context = this.identityProxy.buildContext(req);
    const result = await this.identityProxy.refreshToken(refreshToken, context);
    this.cookiePolicy.setAuthCookies(res, result.access_token, result.refresh_token);
    return result;
  }

  @Post('auth/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies['access_token']) {
      token = req.cookies['access_token'];
    }

    if (token) {
      await this.identityProxy.logout(token);
    }
    this.cookiePolicy.clearAuthCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Get('auth/onboarding-status')
  async getOnboardingStatus(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.getOnboardingStatus(user.sub);
  }

  @Post('auth/forgot-password')
  async forgotPassword(@Body() body: any, @Req() req: Request) {
    const context = this.identityProxy.buildContext(req);
    return await this.identityProxy.forgotPassword(body, context);
  }

  @Post('auth/reset-password')
  async resetPassword(@Body() body: any, @Req() req: Request) {
    const context = this.identityProxy.buildContext(req);
    return await this.identityProxy.resetPassword(body, context);
  }

  @Post('auth/set-password')
  async setPassword(@Body() body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const context = this.identityProxy.buildContext(req);
    const result = await this.identityProxy.setPassword(body, context);
    this.cookiePolicy.setAuthCookies(res, result.access_token, result.refresh_token);
    return result;
  }

  @Get('auth/social-register-info')
  async getSocialRegisterInfo(@Query('token') token: string) {
    return await this.identityProxy.getSocialRegisterInfo(token);
  }

  @Get('auth/passkey/register-options')
  async passkeyRegisterOptions(@Req() req: Request) {
    const user = (req as any).user;
    const options = await this.identityProxy.getPasskeyRegisterOptions(user.sub);
    (req as any).session.registrationOptions = JSON.parse(options.options_json);
    return options;
  }

  @Post('auth/passkey/register-verify')
  async passkeyRegisterVerify(@Body() body: any, @Req() req: Request) {
    const user = (req as any).user;
    const currentOptions = (req as any).session.registrationOptions;
    await this.identityProxy.verifyPasskeyRegister(user.sub, currentOptions, body);
    delete (req as any).session.registrationOptions;
    return { success: true };
  }

  @Post('auth/passkey/login-options')
  async passkeyLoginOptions(@Body() body: { email?: string }, @Req() req: Request) {
    const options = await this.identityProxy.getPasskeyLoginOptions(body.email);
    (req as any).session.loginOptions = JSON.parse(options.options_json);
    return options;
  }

  @Post('auth/passkey/login-verify')
  async passkeyLoginVerify(@Body() body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const currentOptions = (req as any).session.loginOptions;
    const context = this.identityProxy.buildContext(req);
    const result = await this.identityProxy.verifyPasskeyLogin(body, currentOptions, context);
    delete (req as any).session.loginOptions;
    this.cookiePolicy.setAuthCookies(res, result.access_token, result.refresh_token);
    return result;
  }

  @Post('auth/security/context-check')
  async checkContext(@Body() body: { urlCountry: string }, @Req() req: Request) {
    return await this.identityProxy.checkSecurityContext(body.urlCountry, req.ip || 'unknown');
  }

  @Get('auth/sessions')
  async getSessions(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.getSessions(user.sub);
  }

  @Post('auth/sessions/:id/revoke')
  async revokeSession(@Req() req: Request, @Param('id') sessionId: string) {
    const user = (req as any).user;
    return await this.identityProxy.revokeSession(user.sub, sessionId);
  }

  @Post('auth/impersonate')
  async impersonate(@Body() body: { userId: string }, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const adminUser = (req as any).user;
    const context = this.identityProxy.buildContext(req);
    const result = await this.identityProxy.impersonate(adminUser.sub, body.userId, context);
    this.cookiePolicy.setAuthCookies(res, result.access_token, result.refresh_token);
    return result;
  }

  @Post('auth/change-password')
  async changePassword(@Body() body: any, @Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.changePassword(user.sub, body);
  }

  @Post('auth/2fa/generate')
  async generate2faSecret(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.generate2faSecret(user.sub);
  }

  @Post('auth/2fa/enable')
  async enable2fa(@Body() body: { token: string }, @Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.enable2fa(user.sub, body.token);
  }

  @Post('auth/2fa/disable')
  async disable2fa(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.disable2fa(user.sub);
  }

  @Post('auth/2fa/backup-codes/generate')
  async generateBackupCodes(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.generateBackupCodes(user.sub);
  }

  @Post('auth/2fa/send-email-verification')
  async sendEmailVerification(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.send2faEmailVerification(user.sub);
  }

  @Post('auth/2fa/verify-email-verification')
  async verifyEmailVerification(@Body() body: { code: string }, @Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.verify2faEmailVerification(user.sub, body.code);
  }

  @Get('auth/location')
  async getLocation(@Req() req: Request) {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const result = await this.identityProxy.getLocation(ip as string);
    return {
        ...result,
        ip: ip
    };
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
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC'
  ) {
    const user = (req as any).user;
    return await this.identityProxy.listUsers({
      page: Number(page),
      pageSize: Number(pageSize),
      searchTerm,
      statusFilter,
      sortColumn,
      sortDirection,
      tenantId: user?.tenantId,
    });
  }

  @Get('users/job-titles')
  async getJobTitles() {
    return await this.identityProxy.getJobTitles();
  }

  @Get('users/profile')
  async getMyProfile(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.getUserProfile(user?.sub);
  }

  @Get('users/audit-logs')
  async getMyAuditLogs(@Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.getUserAuditLogs(user?.sub);
  }

  @Patch('users/profile')
  async updateMyProfile(@Req() req: Request, @Body() dto: any) {
    const user = (req as any).user;
    return await this.identityProxy.updateUserProfile(user?.sub, dto);
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() dto: any, @Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.updateUser(id, dto, user.tenantId);
  }

  @Delete('users/:id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.deleteUser(id, user.tenantId);
  }

  @Post('users/invite')
  async invite(@Req() req: Request, @Body() dto: any) {
    const user = (req as any).user;
    return await this.identityProxy.inviteUser(dto, user?.sub);
  }

  @Post('users/:id/force-logout')
  async forceLogout(@Param('id') id: string) {
    return await this.identityProxy.forceLogout(id);
  }

  @Post('users/:id/block-and-logout')
  async blockAndLogout(@Param('id') id: string) {
    return await this.identityProxy.blockAndLogout(id);
  }

  @Put('users/:id/status')
  async setUserStatus(@Param('id') id: string, @Body() body: { isOnline: boolean }, @Req() req: Request) {
    const user = (req as any).user;
    return await this.identityProxy.setUserStatus(id, body.isOnline, user.tenantId);
  }

  @Post('users/:id/reset-password')
  async sendPasswordReset(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    const context = this.identityProxy.buildContext(req);
    return await this.identityProxy.sendPasswordReset(id, user.tenantId, context);
  }

  @Post('users/profile/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Req() req: Request, @UploadedFile() file: any) {
    const user = (req as any).user;
    return await this.identityProxy.uploadAvatar(user?.sub, file.originalname, file.buffer);
  }

  // --- Localization ---

  @Get('localization/config/:code')
  async getConfig(@Param('code') code: string) {
    return await this.identityProxy.getLocalizationConfig(code);
  }

  @Get('localization/lookup/:taxId')
  async lookup(@Param('taxId') taxId: string, @Query('country') country: string) {
    return await this.identityProxy.localizationLookup(taxId, country);
  }

  // --- Common ---

  @Head('common/users/exists')
  @HttpCode(HttpStatus.OK)
  async checkUserExists(@Query('email') email: string) {
    const result = await this.identityProxy.checkUserExists(email);
    if (!result.exists) throw new NotFoundException('User not found');
  }

  @Head('common/organizations/exists')
  @HttpCode(HttpStatus.OK)
  async checkOrganizationExists(@Query('taxId') taxId: string) {
    const result = await this.identityProxy.checkOrganizationExists(taxId);
    if (!result.exists) throw new NotFoundException('Organization not found');
  }

  // --- Admin ---

  @Get('admin/tenants')
  async listTenants() {
    return await this.identityProxy.listTenants();
  }
}
