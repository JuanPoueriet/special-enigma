import { Controller, Inject, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AuthService,
  UserRepository,
} from '@virtex/domain-identity-domain';
import {
  CheckSecurityContextUseCase,
  ImpersonateUserUseCase,
  ChangePasswordUseCase,
  SetupMfaUseCase,
  ConfirmMfaUseCase,
  Disable2faUseCase,
  GenerateBackupCodesUseCase,
  Send2faEmailVerificationUseCase,
  Verify2faEmailVerificationUseCase,
  ListUsersUseCase,
  GetJobTitlesUseCase,
  GetUserProfileUseCase,
  GetAuditLogsUseCase,
  UpdateUserProfileUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  InviteUserUseCase,
  ForceLogoutUseCase,
  BlockUserUseCase,
  UploadAvatarUseCase,
  ForgotPasswordUseCase,
} from '@virtex/domain-identity-application';
import { status } from '@grpc/grpc-js';
import { GrpcAuthGuard } from '../guards/grpc-auth.guard';

@Controller()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UsersGrpcController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly checkSecurityContextUseCase: CheckSecurityContextUseCase,
    private readonly impersonateUserUseCase: ImpersonateUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly setupMfaUseCase: SetupMfaUseCase,
    private readonly confirmMfaUseCase: ConfirmMfaUseCase,
    private readonly disable2faUseCase: Disable2faUseCase,
    private readonly generateBackupCodesUseCase: GenerateBackupCodesUseCase,
    private readonly send2faEmailVerificationUseCase: Send2faEmailVerificationUseCase,
    private readonly verify2faEmailVerificationUseCase: Verify2faEmailVerificationUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getJobTitlesUseCase: GetJobTitlesUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly getAuditLogsUseCase: GetAuditLogsUseCase,
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly inviteUserUseCase: InviteUserUseCase,
    private readonly forceLogoutUseCase: ForceLogoutUseCase,
    private readonly blockUserUseCase: BlockUserUseCase,
    private readonly uploadAvatarUseCase: UploadAvatarUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
  ) {}

  private async verifyToken(accessToken: string) {
    try {
      return await this.authService.verifyToken(accessToken);
    } catch (e: any) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: e.message || 'Invalid token',
      });
    }
  }

  private mapUserToResponse(user: any) {
    return {
      sub: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      country: user.country,
      timezone: user.timezone,
      phone: user.phone,
      avatar_url: user.avatarUrl,
      preferred_language: user.preferredLanguage,
      role: user.role,
      company_name: user.company?.name || user.companyName,
      company_id: user.company?.id || user.companyId,
      is_active: user.isActive,
      status: user.status,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  @GrpcMethod('IdentityService', 'GetMe')
  async getMe(data: { access_token: string }) {
    const payload = await this.verifyToken(data.access_token);
    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    return this.mapUserToResponse(user);
  }

  @GrpcMethod('IdentityService', 'CheckSecurityContext')
  async checkSecurityContext(data: any) {
    const result = await this.checkSecurityContextUseCase.execute(data);
    return {
      action: result.action,
      detected_country: result.detectedCountry || '',
      target_country: result.targetCountry,
      discrepancy_level: result.discrepancyLevel,
    };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'Impersonate')
  async impersonate(data: any) {
    const result = await this.impersonateUserUseCase.execute(
      data.user.sub,
      data.target_user_id,
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'ChangePassword')
  async changePassword(data: any) {
    await this.changePasswordUseCase.execute(data.user.sub, {
      currentPassword: data.current_password,
      newPassword: data.new_password,
    });
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'Generate2faSecret')
  async generate2faSecret(data: any) {
    const result = await this.setupMfaUseCase.execute(data.user.sub);
    return {
      secret: result.secret,
      otpauth_url: result.otpauthUrl,
    };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'Enable2fa')
  async enable2fa(data: any) {
    const success = await this.confirmMfaUseCase.execute(data.user.sub, data.token);
    let codes: string[] = [];
    if (success) {
      const result = await this.generateBackupCodesUseCase.execute(data.user.sub);
      codes = result.codes;
    }
    return {
      success,
      backup_codes: codes,
    };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'Disable2fa')
  async disable2fa(data: any) {
    await this.disable2faUseCase.execute(data.user.sub);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'GenerateBackupCodes')
  async generateBackupCodes(data: any) {
    const result = await this.generateBackupCodesUseCase.execute(data.user.sub);
    return { codes: result.codes };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'Send2faEmailVerification')
  async send2faEmailVerification(data: any) {
    await this.send2faEmailVerificationUseCase.execute(data.user.sub);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'Verify2faEmailVerification')
  async verify2faEmailVerification(data: any) {
    await this.verify2faEmailVerificationUseCase.execute(data.user.sub, data.code);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'ListUsers')
  async listUsers(data: any) {
    const result = await this.listUsersUseCase.execute({
      page: data.page,
      pageSize: data.page_size,
      searchTerm: data.search_term,
      statusFilter: data.status_filter,
      sortColumn: data.sort_column,
      sortDirection: data.sort_direction as any,
      tenantId: data.tenant_id,
    });

    return {
      data: result.data.map((u) => this.mapUserToResponse(u)),
      total: result.total,
    };
  }

  @GrpcMethod('IdentityService', 'GetJobTitles')
  async getJobTitles() {
    const titles = await this.getJobTitlesUseCase.execute();
    return { titles: titles.map((t: any) => t.title) };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'GetUserProfile')
  async getUserProfile(data: any) {
    const userId = data.user_id || data.user.sub;
    const user = await this.getUserProfileUseCase.execute(userId);
    return this.mapUserToResponse(user);
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'GetUserAuditLogs')
  async getUserAuditLogs(data: any) {
    const userId = data.user_id || data.user.sub;
    const logs = await this.getAuditLogsUseCase.execute(userId);
    return {
      logs: logs.map((l) => ({
        id: l.id,
        event: l.event,
        user_id: l.userId,
        metadata_json: JSON.stringify(l.metadata),
        timestamp: l.timestamp,
      })),
    };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'UpdateUserProfile')
  async updateUserProfile(data: any) {
    const user = await this.updateUserProfileUseCase.execute(data.user.sub, {
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone,
      preferredLanguage: data.preferred_language,
      status: data.status,
    });
    return this.mapUserToResponse(user);
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'UpdateUser')
  async updateUser(data: any) {
    const user = await this.updateUserUseCase.execute(
      data.id,
      {
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        preferredLanguage: data.preferred_language,
        status: data.status,
      },
      data.tenant_id
    );
    return this.mapUserToResponse(user);
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'DeleteUser')
  async deleteUser(data: any) {
    await this.deleteUserUseCase.execute(data.id, data.tenant_id);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'InviteUser')
  async inviteUser(data: any) {
    const user = await this.inviteUserUseCase.execute(
      {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        role: data.role,
      },
      data.user.sub
    );
    return this.mapUserToResponse(user);
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'ForceLogout')
  async forceLogout(data: any) {
    await this.forceLogoutUseCase.execute(data.user_id);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'BlockAndLogout')
  async blockAndLogout(data: any) {
    await this.blockUserUseCase.execute(data.user_id);
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'SetUserStatus')
  async setUserStatus(data: any) {
    const userId = data.id || data.user.sub;
    const user = await this.updateUserUseCase.execute(
      userId,
      { status: data.is_online ? 'ONLINE' : 'OFFLINE' } as any,
      data.tenant_id
    );
    return {
        sub: user.id,
        email: user.email,
        status: user.status
    };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'SendPasswordReset')
  async sendPasswordReset(data: any) {
    const user = await this.userRepository.findById(data.id, data.tenant_id);
    if (!user) {
      throw new RpcException({ code: status.NOT_FOUND, message: 'User not found' });
    }
    await this.forgotPasswordUseCase.execute(
      { email: user.email, recaptchaToken: '' },
      data.context,
      true
    );
    return {};
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'UploadAvatar')
  async uploadAvatar(data: any) {
    const url = await this.uploadAvatarUseCase.execute(
      data.user.sub,
      data.file_name,
      data.file_content
    );
    return { url };
  }

  @GrpcMethod('IdentityService', 'CheckUserExists')
  async checkUserExists(data: any) {
    const user = await this.userRepository.findByEmail(data.email);
    return { exists: !!user };
  }
}
