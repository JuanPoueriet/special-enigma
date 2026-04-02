import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import type { Request } from 'express';
import { firstValueFrom, Observable } from 'rxjs';

interface IdentityService {
  getMe(data: { access_token: string }): Observable<any>;
  login(data: any): Observable<any>;
  initiateSignup(data: any): Observable<any>;
  verifySignup(data: any): Observable<any>;
  completeOnboarding(data: any): Observable<any>;
  verifyMfa(data: any): Observable<any>;
  refreshToken(data: any): Observable<any>;
  logout(data: any): Observable<any>;
  getOnboardingStatus(data: any): Observable<any>;
  forgotPassword(data: any): Observable<any>;
  resetPassword(data: any): Observable<any>;
  setPassword(data: any): Observable<any>;
  getSocialRegisterInfo(data: any): Observable<any>;
  getPasskeyRegisterOptions(data: any): Observable<any>;
  verifyPasskeyRegister(data: any): Observable<any>;
  getPasskeyLoginOptions(data: any): Observable<any>;
  verifyPasskeyLogin(data: any): Observable<any>;
  checkSecurityContext(data: any): Observable<any>;
  getSessions(data: any): Observable<any>;
  revokeSession(data: any): Observable<any>;
  impersonate(data: any): Observable<any>;
  changePassword(data: any): Observable<any>;
  generate2faSecret(data: any): Observable<any>;
  enable2fa(data: any): Observable<any>;
  disable2fa(data: any): Observable<any>;
  generateBackupCodes(data: any): Observable<any>;
  send2faEmailVerification(data: any): Observable<any>;
  verify2faEmailVerification(data: any): Observable<any>;
  getLocation(data: any): Observable<any>;

  listUsers(data: any): Observable<any>;
  getJobTitles(data: any): Observable<any>;
  getUserProfile(data: any): Observable<any>;
  getUserAuditLogs(data: any): Observable<any>;
  updateUserProfile(data: any): Observable<any>;
  updateUser(data: any): Observable<any>;
  deleteUser(data: any): Observable<any>;
  inviteUser(data: any): Observable<any>;
  forceLogout(data: any): Observable<any>;
  blockAndLogout(data: any): Observable<any>;
  setUserStatus(data: any): Observable<any>;
  sendPasswordReset(data: any): Observable<any>;
  uploadAvatar(data: any): Observable<any>;

  getLocalizationConfig(data: any): Observable<any>;
  localizationLookup(data: any): Observable<any>;

  checkUserExists(data: any): Observable<any>;
  checkOrganizationExists(data: any): Observable<any>;

  listTenants(data: any): Observable<any>;
  healthCheck(data: any): Observable<any>;
}

@Injectable()
export class IdentityProxyService implements OnModuleInit {
  private readonly logger = new Logger(IdentityProxyService.name);
  private identityService: IdentityService;

  constructor(@Inject('IDENTITY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.identityService =
      this.client.getService<IdentityService>('IdentityService');
  }

  private mapGrpcError(error: any, operation: string): never {
    const grpcCode = Number(error?.code);
    const details = error?.details || error?.message || 'Unknown gRPC error';
    this.logger.error(
      `Identity RPC failed on ${operation} (code=${grpcCode}): ${details}`,
    );

    switch (grpcCode) {
      case 3:
        throw new BadRequestException(details);
      case 5:
        throw new NotFoundException(details);
      case 6:
        throw new ConflictException(details);
      case 7:
        throw new ForbiddenException(details);
      case 16:
        throw new UnauthorizedException(details);
      case 14:
        throw new ServiceUnavailableException(
          'Identity service is unavailable',
        );
      case 4:
        throw new GatewayTimeoutException('Identity service timeout');
      default:
        if (grpcCode > 0) {
          throw new BadGatewayException('Identity service error');
        }
        throw new InternalServerErrorException(
          'Unexpected identity proxy error',
        );
    }
  }

  private async callIdentity<T>(
    operation: string,
    request$: Observable<T>,
  ): Promise<T> {
    try {
      return await firstValueFrom(request$);
    } catch (error) {
      this.mapGrpcError(error, operation);
    }
  }

  // --- Request Context Helper ---

  buildContext(req: Request) {
    return {
      ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      user_agent: req.headers['user-agent'] || 'unknown',
    };
  }

  // --- Auth Wrappers ---

  async getMe(accessToken: string) {
    const user = await this.callIdentity(
      'getMe',
      this.identityService.getMe({ access_token: accessToken }),
    );
    return this.mapUserResponse(user);
  }

  async login(data: any, context: any) {
    return await this.callIdentity(
      'login',
      this.identityService.login({ ...data, context }),
    );
  }

  async initiateSignup(data: any) {
    return await this.callIdentity(
      'initiateSignup',
      this.identityService.initiateSignup(data),
    );
  }

  async verifySignup(data: any) {
    return await this.callIdentity(
      'verifySignup',
      this.identityService.verifySignup(data),
    );
  }

  async completeOnboarding(data: any, context: any) {
    return await this.callIdentity(
      'completeOnboarding',
      this.identityService.completeOnboarding({ ...data, context }),
    );
  }

  async verifyMfa(data: any, context: any) {
    return await this.callIdentity(
      'verifyMfa',
      this.identityService.verifyMfa({ ...data, context }),
    );
  }

  async refreshToken(refreshToken: string, context: any) {
    return await this.callIdentity(
      'refreshToken',
      this.identityService.refreshToken({
        refresh_token: refreshToken,
        context,
      }),
    );
  }

  async logout(accessToken: string) {
    return await this.callIdentity(
      'logout',
      this.identityService.logout({ access_token: accessToken }),
    );
  }

  async getOnboardingStatus(userId: string) {
    return await this.callIdentity(
      'getOnboardingStatus',
      this.identityService.getOnboardingStatus({ user_id: userId }),
    );
  }

  async forgotPassword(data: any, context: any) {
    return await this.callIdentity(
      'forgotPassword',
      this.identityService.forgotPassword({ ...data, context }),
    );
  }

  async resetPassword(data: any, context: any) {
    return await this.callIdentity(
      'resetPassword',
      this.identityService.resetPassword({ ...data, context }),
    );
  }

  async setPassword(data: any, context: any) {
    return await this.callIdentity(
      'setPassword',
      this.identityService.setPassword({ ...data, context }),
    );
  }

  async getSocialRegisterInfo(token: string) {
    return await this.callIdentity(
      'getSocialRegisterInfo',
      this.identityService.getSocialRegisterInfo({ token }),
    );
  }

  async getPasskeyRegisterOptions(userId: string) {
    return await this.callIdentity(
      'getPasskeyRegisterOptions',
      this.identityService.getPasskeyRegisterOptions({ user_id: userId }),
    );
  }

  async verifyPasskeyRegister(userId: string, challenge: any, response: any) {
    return await this.callIdentity(
      'verifyPasskeyRegister',
      this.identityService.verifyPasskeyRegister({
        user_id: userId,
        challenge_json: JSON.stringify(challenge),
        response_json: JSON.stringify(response),
      }),
    );
  }

  async getPasskeyLoginOptions(email?: string) {
    return await this.callIdentity(
      'getPasskeyLoginOptions',
      this.identityService.getPasskeyLoginOptions({ email }),
    );
  }

  async verifyPasskeyLogin(response: any, challenge: any, context: any) {
    return await this.callIdentity(
      'verifyPasskeyLogin',
      this.identityService.verifyPasskeyLogin({
        response_json: JSON.stringify(response),
        challenge_json: JSON.stringify(challenge),
        context,
      }),
    );
  }

  async checkSecurityContext(urlCountry: string, ip: string) {
    return await this.callIdentity(
      'checkSecurityContext',
      this.identityService.checkSecurityContext({
        url_country: urlCountry,
        ip,
      }),
    );
  }

  async getSessions(userId: string) {
    return await this.callIdentity(
      'getSessions',
      this.identityService.getSessions({ user_id: userId }),
    );
  }

  async revokeSession(userId: string, sessionId: string) {
    return await this.callIdentity(
      'revokeSession',
      this.identityService.revokeSession({
        user_id: userId,
        session_id: sessionId,
      }),
    );
  }

  async impersonate(adminUserId: string, targetUserId: string, context: any) {
    return await this.callIdentity(
      'impersonate',
      this.identityService.impersonate({
        admin_user_id: adminUserId,
        target_user_id: targetUserId,
        context,
      }),
    );
  }

  async changePassword(userId: string, data: any) {
    return await this.callIdentity(
      'changePassword',
      this.identityService.changePassword({
        user_id: userId,
        current_password: data.currentPassword,
        new_password: data.newPassword,
      }),
    );
  }

  async generate2faSecret(userId: string) {
    return await this.callIdentity(
      'generate2faSecret',
      this.identityService.generate2faSecret({ user_id: userId }),
    );
  }

  async enable2fa(userId: string, token: string) {
    return await this.callIdentity(
      'enable2fa',
      this.identityService.enable2fa({ user_id: userId, token }),
    );
  }

  async disable2fa(userId: string) {
    return await this.callIdentity(
      'disable2fa',
      this.identityService.disable2fa({ user_id: userId }),
    );
  }

  async generateBackupCodes(userId: string) {
    return await this.callIdentity(
      'generateBackupCodes',
      this.identityService.generateBackupCodes({ user_id: userId }),
    );
  }

  async send2faEmailVerification(userId: string) {
    return await this.callIdentity(
      'send2faEmailVerification',
      this.identityService.send2faEmailVerification({ user_id: userId }),
    );
  }

  async verify2faEmailVerification(userId: string, code: string) {
    return await this.callIdentity(
      'verify2faEmailVerification',
      this.identityService.verify2faEmailVerification({
        user_id: userId,
        code,
      }),
    );
  }

  async getLocation(ip: string) {
    return await this.callIdentity(
      'getLocation',
      this.identityService.getLocation({ ip }),
    );
  }

  // --- Users Wrappers ---

  async listUsers(data: any) {
    const result = await this.callIdentity(
      'listUsers',
      this.identityService.listUsers({
        page: data.page,
        page_size: data.pageSize,
        search_term: data.searchTerm,
        status_filter: data.statusFilter,
        sort_column: data.sortColumn,
        sort_direction: data.sortDirection,
        tenant_id: data.tenantId,
      }),
    );
    return {
      ...result,
      data: result.data ? result.data.map((u: any) => this.mapUserResponse(u)) : [],
    };
  }

  async getJobTitles() {
    return await this.callIdentity(
      'getJobTitles',
      this.identityService.getJobTitles({}),
    );
  }

  async getUserProfile(userId: string) {
    const user = await this.callIdentity(
      'getUserProfile',
      this.identityService.getUserProfile({ user_id: userId }),
    );
    return this.mapUserResponse(user);
  }

  async getUserAuditLogs(userId: string) {
    return await this.callIdentity(
      'getUserAuditLogs',
      this.identityService.getUserAuditLogs({ user_id: userId }),
    );
  }

  async updateUserProfile(userId: string, data: any) {
    const user = await this.callIdentity(
      'updateUserProfile',
      this.identityService.updateUserProfile({
        user_id: userId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        preferred_language: data.preferredLanguage,
        status: data.status,
      }),
    );
    return this.mapUserResponse(user);
  }

  async updateUser(id: string, data: any, tenantId: string) {
    const user = await this.callIdentity(
      'updateUser',
      this.identityService.updateUser({
        id,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        preferred_language: data.preferredLanguage,
        status: data.status,
        tenant_id: tenantId,
      }),
    );
    return this.mapUserResponse(user);
  }

  async deleteUser(id: string, tenantId: string) {
    return await this.callIdentity(
      'deleteUser',
      this.identityService.deleteUser({ id, tenant_id: tenantId }),
    );
  }

  async inviteUser(data: any, inviterId: string) {
    const user = await this.callIdentity(
      'inviteUser',
      this.identityService.inviteUser({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        inviter_id: inviterId,
      }),
    );
    return this.mapUserResponse(user);
  }

  async forceLogout(userId: string) {
    return await this.callIdentity(
      'forceLogout',
      this.identityService.forceLogout({ user_id: userId }),
    );
  }

  async blockAndLogout(userId: string) {
    return await this.callIdentity(
      'blockAndLogout',
      this.identityService.blockAndLogout({ user_id: userId }),
    );
  }

  async setUserStatus(id: string, isOnline: boolean, tenantId: string) {
    return await this.callIdentity(
      'setUserStatus',
      this.identityService.setUserStatus({
        id,
        is_online: isOnline,
        tenant_id: tenantId,
      }),
    );
  }

  async sendPasswordReset(id: string, tenantId: string, context: any) {
    return await this.callIdentity(
      'sendPasswordReset',
      this.identityService.sendPasswordReset({
        id,
        tenant_id: tenantId,
        context,
      }),
    );
  }

  async uploadAvatar(userId: string, fileName: string, fileContent: Buffer) {
    return await this.callIdentity(
      'uploadAvatar',
      this.identityService.uploadAvatar({
        user_id: userId,
        file_name: fileName,
        file_content: fileContent,
      }),
    );
  }

  // --- Localization Wrappers ---

  async getLocalizationConfig(code: string) {
    const result = await this.callIdentity(
      'getLocalizationConfig',
      this.identityService.getLocalizationConfig({ code }),
    );

    // Transform gRPC response to frontend format
    return {
      countryCode: result.country_code,
      name: result.name,
      currency: result.currency,
      locale: result.locale,
      taxIdRegex: result.tax_id_regex,
      fiscalRegionId: result.fiscal_region_id,
      taxIdLabel: result.tax_id_label,
      taxIdMask: result.tax_id_mask,
      phoneCode: result.phone_code,
      formSchema: result.form_schema_json ? JSON.parse(result.form_schema_json) : {},
    };
  }

  async localizationLookup(taxId: string, country: string) {
    const result = await this.callIdentity(
      'localizationLookup',
      this.identityService.localizationLookup({ tax_id: taxId, country }),
    );
    return {
        taxId: result.tax_id,
        country: result.country,
        name: result.name,
        legalName: result.legal_name,
        status: result.status,
        isValid: result.is_valid,
        industry: result.industry,
    };
  }

  // --- Common Wrappers ---

  async checkUserExists(email: string) {
    return await this.callIdentity(
      'checkUserExists',
      this.identityService.checkUserExists({ email }),
    );
  }

  async checkOrganizationExists(taxId: string) {
    return await this.callIdentity(
      'checkOrganizationExists',
      this.identityService.checkOrganizationExists({ tax_id: taxId }),
    );
  }

  // --- Admin Wrappers ---

  async listTenants() {
    return await this.callIdentity(
      'listTenants',
      this.identityService.listTenants({}),
    );
  }

  async checkConnectivity() {
    try {
      const response = await this.callIdentity(
        'healthCheck',
        this.identityService.healthCheck({}),
      );
      return response;
    } catch (error) {
      this.logger.error(
        `Identity Service connectivity check failed: ${error.message}`,
      );
      return { status: 'error', message: error.message };
    }
  }

  // --- Private Mapping Helpers ---

  private mapUserResponse(user: any) {
    if (!user) return null;
    return {
      sub: user.sub,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      country: user.country,
      timezone: user.timezone,
      phone: user.phone,
      avatarUrl: user.avatar_url,
      preferredLanguage: user.preferred_language,
      role: user.role,
      companyName: user.company_name,
      companyId: user.company_id,
      isActive: user.is_active,
      status: user.status,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}
