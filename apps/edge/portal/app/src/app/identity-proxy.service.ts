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
import { Metadata } from '@grpc/grpc-js';
import { firstValueFrom, Observable } from 'rxjs';
import type { Request } from 'express';

type GrpcMethod<T, R = any> = (data: T, metadata?: Metadata) => Observable<R>;

interface IdentityService {
  getMe: GrpcMethod<{ access_token: string }>;
  login: GrpcMethod<any>;
  initiateSignup: GrpcMethod<any>;
  verifySignup: GrpcMethod<any>;
  completeOnboarding: GrpcMethod<any>;
  verifyMfa: GrpcMethod<any>;
  refreshToken: GrpcMethod<any>;
  logout: GrpcMethod<any>;
  getOnboardingStatus: GrpcMethod<any>;
  forgotPassword: GrpcMethod<any>;
  resetPassword: GrpcMethod<any>;
  setPassword: GrpcMethod<any>;
  getSocialRegisterInfo: GrpcMethod<any>;
  getPasskeyRegisterOptions: GrpcMethod<any>;
  verifyPasskeyRegister: GrpcMethod<any>;
  getPasskeyLoginOptions: GrpcMethod<any>;
  verifyPasskeyLogin: GrpcMethod<any>;
  checkSecurityContext: GrpcMethod<any>;
  getSessions: GrpcMethod<any>;
  revokeSession: GrpcMethod<any>;
  impersonate: GrpcMethod<any>;
  handleSocialLogin: GrpcMethod<any>;
  changePassword: GrpcMethod<any>;
  generate2faSecret: GrpcMethod<any>;
  enable2fa: GrpcMethod<any>;
  disable2fa: GrpcMethod<any>;
  generateBackupCodes: GrpcMethod<any>;
  send2faEmailVerification: GrpcMethod<any>;
  verify2faEmailVerification: GrpcMethod<any>;
  getLocation: GrpcMethod<any>;

  listUsers: GrpcMethod<any>;
  getJobTitles: GrpcMethod<any>;
  getUserProfile: GrpcMethod<any>;
  getUserAuditLogs: GrpcMethod<any>;
  updateUserProfile: GrpcMethod<any>;
  updateUser: GrpcMethod<any>;
  deleteUser: GrpcMethod<any>;
  inviteUser: GrpcMethod<any>;
  forceLogout: GrpcMethod<any>;
  blockAndLogout: GrpcMethod<any>;
  setUserStatus: GrpcMethod<any>;
  sendPasswordReset: GrpcMethod<any>;
  uploadAvatar: GrpcMethod<any>;

  getLocalizationConfig: GrpcMethod<any>;
  localizationLookup: GrpcMethod<any>;

  checkUserExists: GrpcMethod<any>;
  checkOrganizationExists: GrpcMethod<any>;

  listTenants: GrpcMethod<any>;
  healthCheck: GrpcMethod<any>;
}

@Injectable()
export class IdentityProxyService {
  private readonly logger = new Logger(IdentityProxyService.name);
  private _identityService: IdentityService;

  constructor(@Inject('IDENTITY_PACKAGE') private client: ClientGrpc) {}

  private get identityService(): IdentityService {
    return this._identityService;
  }

  private set identityService(service: IdentityService) {
    this._identityService = service;
  }

  onModuleInit() {
    try {
      this.identityService =
        this.client.getService<IdentityService>('IdentityService');
      this.logger.log('IdentityService gRPC client initialized');
    } catch (error) {
      this.logger.error(
        `Failed to initialize Identity gRPC service: ${error.message}`,
      );
    }
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
    if (!this.identityService) {
      throw new ServiceUnavailableException('Identity service not available');
    }
    try {
      return await firstValueFrom(request$, { defaultValue: undefined } as any);
    } catch (error) {
      this.mapGrpcError(error, operation);
    }
  }

  getMetadata(req: Request): Metadata {
    const metadata = new Metadata();
    const requestId =
      req.headers['x-request-id'] || req.headers['X-Request-Id'];
    if (requestId) {
      metadata.add('x-request-id', requestId as string);
    }
    const tenantId = req.headers['x-tenant-id'] || (req as any).user?.tenantId;
    if (tenantId) {
      metadata.add('x-tenant-id', tenantId);
    }
    return metadata;
  }

  // --- Request Context Helper ---

  buildContext(req: Request) {
    return {
      ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      user_agent: req.headers['user-agent'] || 'unknown',
    };
  }

  // --- Auth Wrappers ---

  async getMe(accessToken: string, metadata: Metadata) {
    return await this.callIdentity(
      'getMe',
      this.identityService.getMe({ access_token: accessToken }, metadata),
    );
  }

  async login(data: any, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'login',
      this.identityService.login({ ...data, context }, metadata),
    );
  }

  async initiateSignup(data: any, metadata: Metadata) {
    return await this.callIdentity(
      'initiateSignup',
      this.identityService.initiateSignup(data, metadata),
    );
  }

  async verifySignup(data: any, metadata: Metadata) {
    return await this.callIdentity(
      'verifySignup',
      this.identityService.verifySignup(data, metadata),
    );
  }

  async completeOnboarding(data: any, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'completeOnboarding',
      this.identityService.completeOnboarding({ ...data, context }, metadata),
    );
  }

  async verifyMfa(data: any, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'verifyMfa',
      this.identityService.verifyMfa({ ...data, context }, metadata),
    );
  }

  async refreshToken(refreshToken: string, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'refreshToken',
      this.identityService.refreshToken(
        {
          refresh_token: refreshToken,
          context,
        },
        metadata,
      ),
    );
  }

  async logout(accessToken: string, metadata: Metadata) {
    return await this.callIdentity(
      'logout',
      this.identityService.logout({ access_token: accessToken }, metadata),
    );
  }

  async getOnboardingStatus(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'getOnboardingStatus',
      this.identityService.getOnboardingStatus({ user_id: userId }, metadata),
    );
  }

  async forgotPassword(data: any, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'forgotPassword',
      this.identityService.forgotPassword({ ...data, context }, metadata),
    );
  }

  async resetPassword(data: any, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'resetPassword',
      this.identityService.resetPassword({ ...data, context }, metadata),
    );
  }

  async setPassword(data: any, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'setPassword',
      this.identityService.setPassword({ ...data, context }, metadata),
    );
  }

  async getSocialRegisterInfo(token: string, metadata: Metadata) {
    return await this.callIdentity(
      'getSocialRegisterInfo',
      this.identityService.getSocialRegisterInfo({ token }, metadata),
    );
  }

  async getPasskeyRegisterOptions(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'getPasskeyRegisterOptions',
      this.identityService.getPasskeyRegisterOptions(
        { user_id: userId },
        metadata,
      ),
    );
  }

  async verifyPasskeyRegister(
    userId: string,
    challenge: any,
    response: any,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'verifyPasskeyRegister',
      this.identityService.verifyPasskeyRegister(
        {
          user_id: userId,
          challenge_json: JSON.stringify(challenge),
          response_json: JSON.stringify(response),
        },
        metadata,
      ),
    );
  }

  async getPasskeyLoginOptions(email: string | undefined, metadata: Metadata) {
    return await this.callIdentity(
      'getPasskeyLoginOptions',
      this.identityService.getPasskeyLoginOptions({ email }, metadata),
    );
  }

  async verifyPasskeyLogin(
    response: any,
    challenge: any,
    context: any,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'verifyPasskeyLogin',
      this.identityService.verifyPasskeyLogin(
        {
          response_json: JSON.stringify(response),
          challenge_json: JSON.stringify(challenge),
          context,
        },
        metadata,
      ),
    );
  }

  async checkSecurityContext(
    urlCountry: string,
    ip: string,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'checkSecurityContext',
      this.identityService.checkSecurityContext(
        {
          url_country: urlCountry,
          ip,
        },
        metadata,
      ),
    );
  }

  async getSessions(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'getSessions',
      this.identityService.getSessions({ user_id: userId }, metadata),
    );
  }

  async revokeSession(userId: string, sessionId: string, metadata: Metadata) {
    return await this.callIdentity(
      'revokeSession',
      this.identityService.revokeSession(
        {
          user_id: userId,
          session_id: sessionId,
        },
        metadata,
      ),
    );
  }

  async impersonate(
    adminUserId: string,
    targetUserId: string,
    context: any,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'impersonate',
      this.identityService.impersonate(
        {
          admin_user_id: adminUserId,
          target_user_id: targetUserId,
          context,
        },
        metadata,
      ),
    );
  }

  async handleSocialLogin(profile: any, context: any, metadata: Metadata) {
    return await this.callIdentity(
      'handleSocialLogin',
      this.identityService.handleSocialLogin(
        {
          profile: {
            id: profile.id,
            email: profile.email,
            first_name: profile.firstName,
            last_name: profile.lastName,
            provider: profile.provider,
          },
          context: {
            ip: context.ip,
            user_agent: context.userAgent,
          },
        },
        metadata,
      ),
    );
  }

  async changePassword(userId: string, data: any, metadata: Metadata) {
    return await this.callIdentity(
      'changePassword',
      this.identityService.changePassword(
        {
          user_id: userId,
          current_password: data.currentPassword,
          new_password: data.newPassword,
        },
        metadata,
      ),
    );
  }

  async generate2faSecret(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'generate2faSecret',
      this.identityService.generate2faSecret({ user_id: userId }, metadata),
    );
  }

  async enable2fa(userId: string, token: string, metadata: Metadata) {
    return await this.callIdentity(
      'enable2fa',
      this.identityService.enable2fa({ user_id: userId, token }, metadata),
    );
  }

  async disable2fa(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'disable2fa',
      this.identityService.disable2fa({ user_id: userId }, metadata),
    );
  }

  async generateBackupCodes(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'generateBackupCodes',
      this.identityService.generateBackupCodes({ user_id: userId }, metadata),
    );
  }

  async send2faEmailVerification(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'send2faEmailVerification',
      this.identityService.send2faEmailVerification(
        { user_id: userId },
        metadata,
      ),
    );
  }

  async verify2faEmailVerification(
    userId: string,
    code: string,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'verify2faEmailVerification',
      this.identityService.verify2faEmailVerification(
        {
          user_id: userId,
          code,
        },
        metadata,
      ),
    );
  }

  async getLocation(ip: string, metadata: Metadata) {
    return await this.callIdentity(
      'getLocation',
      this.identityService.getLocation({ ip }, metadata),
    );
  }

  // --- Users Wrappers ---

  async listUsers(data: any, metadata: Metadata) {
    return await this.callIdentity(
      'listUsers',
      this.identityService.listUsers(
        {
          page: data.page,
          page_size: data.pageSize,
          search_term: data.searchTerm,
          status_filter: data.statusFilter,
          sort_column: data.sortColumn,
          sort_direction: data.sortDirection,
          tenant_id: data.tenantId,
        },
        metadata,
      ),
    );
  }

  async getJobTitles(metadata: Metadata) {
    return await this.callIdentity(
      'getJobTitles',
      this.identityService.getJobTitles({}, metadata),
    );
  }

  async getUserProfile(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'getUserProfile',
      this.identityService.getUserProfile({ user_id: userId }, metadata),
    );
  }

  async getUserAuditLogs(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'getUserAuditLogs',
      this.identityService.getUserAuditLogs({ user_id: userId }, metadata),
    );
  }

  async updateUserProfile(userId: string, data: any, metadata: Metadata) {
    return await this.callIdentity(
      'updateUserProfile',
      this.identityService.updateUserProfile(
        {
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          preferred_language: data.preferredLanguage,
          status: data.status,
        },
        metadata,
      ),
    );
  }

  async updateUser(
    id: string,
    data: any,
    tenantId: string,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'updateUser',
      this.identityService.updateUser(
        {
          id,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          preferred_language: data.preferredLanguage,
          status: data.status,
          tenant_id: tenantId,
        },
        metadata,
      ),
    );
  }

  async deleteUser(id: string, tenantId: string, metadata: Metadata) {
    return await this.callIdentity(
      'deleteUser',
      this.identityService.deleteUser({ id, tenant_id: tenantId }, metadata),
    );
  }

  async inviteUser(data: any, inviterId: string, metadata: Metadata) {
    return await this.callIdentity(
      'inviteUser',
      this.identityService.inviteUser(
        {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          role: data.role,
          inviter_id: inviterId,
        },
        metadata,
      ),
    );
  }

  async forceLogout(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'forceLogout',
      this.identityService.forceLogout({ user_id: userId }, metadata),
    );
  }

  async blockAndLogout(userId: string, metadata: Metadata) {
    return await this.callIdentity(
      'blockAndLogout',
      this.identityService.blockAndLogout({ user_id: userId }, metadata),
    );
  }

  async setUserStatus(
    id: string,
    isOnline: boolean,
    tenantId: string,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'setUserStatus',
      this.identityService.setUserStatus(
        {
          id,
          is_online: isOnline,
          tenant_id: tenantId,
        },
        metadata,
      ),
    );
  }

  async sendPasswordReset(
    id: string,
    tenantId: string,
    context: any,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'sendPasswordReset',
      this.identityService.sendPasswordReset(
        {
          id,
          tenant_id: tenantId,
          context,
        },
        metadata,
      ),
    );
  }

  async uploadAvatar(
    userId: string,
    fileName: string,
    fileContent: Buffer,
    metadata: Metadata,
  ) {
    return await this.callIdentity(
      'uploadAvatar',
      this.identityService.uploadAvatar(
        {
          user_id: userId,
          file_name: fileName,
          file_content: fileContent,
        },
        metadata,
      ),
    );
  }

  // --- Localization Wrappers ---

  async getLocalizationConfig(code: string, metadata: Metadata) {
    return await this.callIdentity(
      'getLocalizationConfig',
      this.identityService.getLocalizationConfig({ code }, metadata),
    );
  }

  async localizationLookup(taxId: string, country: string, metadata: Metadata) {
    return await this.callIdentity(
      'localizationLookup',
      this.identityService.localizationLookup(
        { tax_id: taxId, country },
        metadata,
      ),
    );
  }

  // --- Common Wrappers ---

  async checkUserExists(email: string, metadata: Metadata) {
    return await this.callIdentity(
      'checkUserExists',
      this.identityService.checkUserExists({ email }, metadata),
    );
  }

  async checkOrganizationExists(taxId: string, metadata: Metadata) {
    return await this.callIdentity(
      'checkOrganizationExists',
      this.identityService.checkOrganizationExists({ tax_id: taxId }, metadata),
    );
  }

  // --- Admin Wrappers ---

  async listTenants(metadata: Metadata) {
    return await this.callIdentity(
      'listTenants',
      this.identityService.listTenants({}, metadata),
    );
  }

  async checkConnectivity(metadata: Metadata) {
    return await this.callIdentity(
      'healthCheck',
      this.identityService.healthCheck({}, metadata),
    );
  }
}
