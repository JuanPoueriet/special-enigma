import { Controller, Get, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  AuthService,
  UserRepository,
  CompanyRepository,
  LocalizationPort,
  GEO_IP_PORT,
  GeoIpPort
} from '@virtex/domain-identity-domain';
import {
  LoginUserUseCase,
  InitiateSignupUseCase,
  VerifySignupUseCase,
  CompleteOnboardingUseCase,
  VerifyMfaUseCase,
  RefreshTokenUseCase,
  LogoutUserUseCase,
  GetOnboardingStatusUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  SetPasswordUseCase,
  GetSocialRegisterInfoUseCase,
  GeneratePasskeyRegistrationOptionsUseCase,
  VerifyPasskeyRegistrationUseCase,
  GeneratePasskeyLoginOptionsUseCase,
  VerifyPasskeyLoginUseCase,
  CheckSecurityContextUseCase,
  GetSessionsUseCase,
  RevokeSessionUseCase,
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
  ListTenantsUseCase,
} from '@virtex/domain-identity-application';
import { status } from '@grpc/grpc-js';

@Controller()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(CompanyRepository) private readonly companyRepository: CompanyRepository,
    @Inject(LocalizationPort) private readonly localizationService: LocalizationPort,
    @Inject(GEO_IP_PORT) private readonly geoIpService: GeoIpPort,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly initiateSignupUseCase: InitiateSignupUseCase,
    private readonly verifySignupUseCase: VerifySignupUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
    private readonly verifyMfaUseCase: VerifyMfaUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
    private readonly getOnboardingStatusUseCase: GetOnboardingStatusUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly setPasswordUseCase: SetPasswordUseCase,
    private readonly getSocialRegisterInfoUseCase: GetSocialRegisterInfoUseCase,
    private readonly generatePasskeyRegistrationOptionsUseCase: GeneratePasskeyRegistrationOptionsUseCase,
    private readonly verifyPasskeyRegistrationUseCase: VerifyPasskeyRegistrationUseCase,
    private readonly generatePasskeyLoginOptionsUseCase: GeneratePasskeyLoginOptionsUseCase,
    private readonly verifyPasskeyLoginUseCase: VerifyPasskeyLoginUseCase,
    private readonly checkSecurityContextUseCase: CheckSecurityContextUseCase,
    private readonly getSessionsUseCase: GetSessionsUseCase,
    private readonly revokeSessionUseCase: RevokeSessionUseCase,
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
    private readonly listTenantsUseCase: ListTenantsUseCase,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  // --- Helper for protected methods ---
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

  // --- Auth ---

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

  @GrpcMethod('IdentityService', 'Login')
  async login(data: any) {
    try {
      const result = await this.loginUserUseCase.execute(
        {
          email: data.email,
          password: data.password,
          rememberMe: data.remember_me,
          recaptchaToken: data.recaptcha_token,
        },
        data.context
      );

      return {
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        expires_in: result.expiresIn,
        mfa_required: result.mfaRequired,
      };
    } catch (e: any) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: e.message || 'Login failed',
      });
    }
  }

  @GrpcMethod('IdentityService', 'InitiateSignup')
  async initiateSignup(data: any) {
    await this.initiateSignupUseCase.execute(data);
    return {};
  }

  @GrpcMethod('IdentityService', 'VerifySignup')
  async verifySignup(data: any) {
    const result = await this.verifySignupUseCase.execute({
      email: data.email,
      otp: data.code,
    });
    return {
      onboarding_token: result.onboardingToken,
    };
  }

  @GrpcMethod('IdentityService', 'CompleteOnboarding')
  async completeOnboarding(data: any) {
    const result = await this.completeOnboardingUseCase.execute(
      {
        onboardingToken: data.onboarding_token,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        companyName: data.company_name,
        taxId: data.tax_id,
        country: data.country,
        regime: data.regime,
        fiscalRegionId: data.fiscal_region_id,
        industry: data.industry,
        recaptchaToken: data.recaptcha_token,
      },
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
  }

  @GrpcMethod('IdentityService', 'VerifyMfa')
  async verifyMfa(data: any) {
    const result = await this.verifyMfaUseCase.execute(
      {
        tempToken: data.temp_token,
        code: data.code,
      },
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
  }

  @GrpcMethod('IdentityService', 'RefreshToken')
  async refreshToken(data: any) {
    const result = await this.refreshTokenUseCase.execute(
      { refreshToken: data.refresh_token },
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
  }

  @GrpcMethod('IdentityService', 'Logout')
  async logout(data: any) {
    const payload = await this.verifyToken(data.access_token);
    if (payload.sessionId) {
      await this.logoutUserUseCase.execute(payload.sessionId);
    }
    return {};
  }

  @GrpcMethod('IdentityService', 'GetOnboardingStatus')
  async getOnboardingStatus(data: any) {
    const result = await this.getOnboardingStatusUseCase.execute(data.user_id);
    return {
      status: result.status,
      is_completed: result.isCompleted,
    };
  }

  @GrpcMethod('IdentityService', 'ForgotPassword')
  async forgotPassword(data: any) {
    await this.forgotPasswordUseCase.execute(
      {
        email: data.email,
        recaptchaToken: data.recaptcha_token,
      },
      data.context
    );
    return {};
  }

  @GrpcMethod('IdentityService', 'ResetPassword')
  async resetPassword(data: any) {
    await this.resetPasswordUseCase.execute(
      {
        token: data.token,
        password: data.password,
      },
      data.context
    );
    return {};
  }

  @GrpcMethod('IdentityService', 'SetPassword')
  async setPassword(data: any) {
    const result = await this.setPasswordUseCase.execute(
      {
        token: data.token,
        password: data.password,
        recaptchaToken: data.recaptcha_token,
      },
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
  }

  @GrpcMethod('IdentityService', 'GetSocialRegisterInfo')
  async getSocialRegisterInfo(data: any) {
    const result = await this.getSocialRegisterInfoUseCase.execute(data.token);
    return {
      email: result.email,
      first_name: result.firstName,
      last_name: result.lastName,
    };
  }

  @GrpcMethod('IdentityService', 'GetPasskeyRegisterOptions')
  async getPasskeyRegisterOptions(data: any) {
    const options = await this.generatePasskeyRegistrationOptionsUseCase.execute(data.user_id);
    return { options_json: JSON.stringify(options) };
  }

  @GrpcMethod('IdentityService', 'VerifyPasskeyRegister')
  async verifyPasskeyRegister(data: any) {
    await this.verifyPasskeyRegistrationUseCase.execute(
      data.user_id,
      JSON.parse(data.challenge_json),
      JSON.parse(data.response_json)
    );
    return {};
  }

  @GrpcMethod('IdentityService', 'GetPasskeyLoginOptions')
  async getPasskeyLoginOptions(data: any) {
    const options = await this.generatePasskeyLoginOptionsUseCase.execute(data.email);
    return { options_json: JSON.stringify(options) };
  }

  @GrpcMethod('IdentityService', 'VerifyPasskeyLogin')
  async verifyPasskeyLogin(data: any) {
    const result = await this.verifyPasskeyLoginUseCase.execute(
      JSON.parse(data.response_json),
      JSON.parse(data.challenge_json),
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
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

  @GrpcMethod('IdentityService', 'GetSessions')
  async getSessions(data: any) {
    const sessions = await this.getSessionsUseCase.execute(data.user_id);
    return {
      sessions: sessions.map((s) => ({
        id: s.id,
        ip_address: s.ipAddress,
        user_agent: s.userAgent,
        created_at: s.createdAt,
        expires_at: s.expiresAt,
        is_active: s.isActive,
      })),
    };
  }

  @GrpcMethod('IdentityService', 'RevokeSession')
  async revokeSession(data: any) {
    await this.revokeSessionUseCase.execute(data.user_id, data.session_id);
    return {};
  }

  @GrpcMethod('IdentityService', 'Impersonate')
  async impersonate(data: any) {
    const result = await this.impersonateUserUseCase.execute(
      data.admin_user_id,
      data.target_user_id,
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
  }

  @GrpcMethod('IdentityService', 'ChangePassword')
  async changePassword(data: any) {
    await this.changePasswordUseCase.execute(data.user_id, {
      currentPassword: data.current_password,
      newPassword: data.new_password,
    });
    return {};
  }

  @GrpcMethod('IdentityService', 'Generate2faSecret')
  async generate2faSecret(data: any) {
    const result = await this.setupMfaUseCase.execute(data.user_id);
    return {
      secret: result.secret,
      otpauth_url: result.otpauthUrl,
    };
  }

  @GrpcMethod('IdentityService', 'Enable2fa')
  async enable2fa(data: any) {
    const success = await this.confirmMfaUseCase.execute(data.user_id, data.token);
    let codes: string[] = [];
    if (success) {
      const result = await this.generateBackupCodesUseCase.execute(data.user_id);
      codes = result.codes;
    }
    return {
      success,
      backup_codes: codes,
    };
  }

  @GrpcMethod('IdentityService', 'Disable2fa')
  async disable2fa(data: any) {
    await this.disable2faUseCase.execute(data.user_id);
    return {};
  }

  @GrpcMethod('IdentityService', 'GenerateBackupCodes')
  async generateBackupCodes(data: any) {
    const result = await this.generateBackupCodesUseCase.execute(data.user_id);
    return { codes: result.codes };
  }

  @GrpcMethod('IdentityService', 'Send2faEmailVerification')
  async send2faEmailVerification(data: any) {
    await this.send2faEmailVerificationUseCase.execute(data.user_id);
    return {};
  }

  @GrpcMethod('IdentityService', 'Verify2faEmailVerification')
  async verify2faEmailVerification(data: any) {
    await this.verify2faEmailVerificationUseCase.execute(data.user_id, data.code);
    return {};
  }

  @GrpcMethod('IdentityService', 'GetLocation')
  async getLocation(data: any) {
    const result = await this.geoIpService.lookup(data.ip);
    return {
      country: result?.country,
      region: result?.region,
      city: result?.city,
      timezone: result?.timezone,
    };
  }

  // --- Users ---

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

  @GrpcMethod('IdentityService', 'GetUserProfile')
  async getUserProfile(data: any) {
    const user = await this.getUserProfileUseCase.execute(data.user_id);
    return this.mapUserToResponse(user);
  }

  @GrpcMethod('IdentityService', 'GetUserAuditLogs')
  async getUserAuditLogs(data: any) {
    const logs = await this.getAuditLogsUseCase.execute(data.user_id);
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

  @GrpcMethod('IdentityService', 'UpdateUserProfile')
  async updateUserProfile(data: any) {
    const user = await this.updateUserProfileUseCase.execute(data.user_id, {
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone,
      preferredLanguage: data.preferred_language,
      status: data.status,
    });
    return this.mapUserToResponse(user);
  }

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

  @GrpcMethod('IdentityService', 'DeleteUser')
  async deleteUser(data: any) {
    await this.deleteUserUseCase.execute(data.id, data.tenant_id);
    return {};
  }

  @GrpcMethod('IdentityService', 'InviteUser')
  async inviteUser(data: any) {
    const user = await this.inviteUserUseCase.execute(
      {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        role: data.role,
      },
      data.inviter_id
    );
    return this.mapUserToResponse(user);
  }

  @GrpcMethod('IdentityService', 'ForceLogout')
  async forceLogout(data: any) {
    await this.forceLogoutUseCase.execute(data.user_id);
    return {};
  }

  @GrpcMethod('IdentityService', 'BlockAndLogout')
  async blockAndLogout(data: any) {
    await this.blockUserUseCase.execute(data.user_id);
    return {};
  }

  @GrpcMethod('IdentityService', 'SetUserStatus')
  async setUserStatus(data: any) {
    const user = await this.updateUserUseCase.execute(
      data.id,
      { status: data.is_online ? 'ONLINE' : 'OFFLINE' } as any,
      data.tenant_id
    );
    return {
        sub: user.id,
        email: user.email,
        status: user.status
    };
  }

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

  @GrpcMethod('IdentityService', 'UploadAvatar')
  async uploadAvatar(data: any) {
    const url = await this.uploadAvatarUseCase.execute(
      data.user_id,
      data.file_name,
      data.file_content
    );
    return { url };
  }

  // --- Localization ---

  @GrpcMethod('IdentityService', 'GetLocalizationConfig')
  async getLocalizationConfig(data: any) {
    const result = await this.localizationService.getConfig(data.code);
    return {
      country_code: result.countryCode,
      name: result.name,
      currency: result.currency,
      locale: result.locale,
      tax_id_regex: result.taxIdRegex,
      fiscal_region_id: result.fiscalRegionId,
      tax_id_label: result.taxIdLabel,
      tax_id_mask: result.taxIdMask,
      phone_code: result.phoneCode,
      form_schema_json: JSON.stringify(result.formSchema),
    };
  }

  @GrpcMethod('IdentityService', 'LocalizationLookup')
  async localizationLookup(data: any) {
    const result = await this.localizationService.lookup(data.tax_id, data.country);
    return {
      tax_id: result.taxId,
      country: result.country,
      name: result.name,
      legal_name: result.legalName,
      status: result.status,
      is_valid: result.isValid,
      industry: result.industry,
    };
  }

  // --- Common ---

  @GrpcMethod('IdentityService', 'CheckUserExists')
  async checkUserExists(data: any) {
    const user = await this.userRepository.findByEmail(data.email);
    return { exists: !!user };
  }

  @GrpcMethod('IdentityService', 'CheckOrganizationExists')
  async checkOrganizationExists(data: any) {
    const exists = await this.companyRepository.existsByTaxId(data.tax_id);
    return { exists };
  }

  // --- Admin ---

  @GrpcMethod('IdentityService', 'ListTenants')
  async listTenants() {
    const tenants = await this.listTenantsUseCase.execute();
    return {
      tenants: tenants.map((t) => ({
        id: t.id,
        name: t.name,
        tax_id: t.taxId,
        country: t.country,
      })),
    };
  }
}
