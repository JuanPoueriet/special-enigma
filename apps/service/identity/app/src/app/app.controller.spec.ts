import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthService,
  UserRepository,
  CompanyRepository,
  LocalizationPort,
  GEO_IP_PORT
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
  ListTenantsUseCase
} from '@virtex/domain-identity-application';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue: { getData: jest.fn().mockReturnValue({ status: 'ok' }) } },
        { provide: AuthService, useValue: { verifyToken: jest.fn() } },
        { provide: UserRepository, useValue: { findById: jest.fn() } },
        { provide: CompanyRepository, useValue: {} },
        { provide: LocalizationPort, useValue: {} },
        { provide: GEO_IP_PORT, useValue: {} },
        { provide: LoginUserUseCase, useValue: { execute: jest.fn() } },
        { provide: InitiateSignupUseCase, useValue: {} },
        { provide: VerifySignupUseCase, useValue: {} },
        { provide: CompleteOnboardingUseCase, useValue: {} },
        { provide: VerifyMfaUseCase, useValue: {} },
        { provide: RefreshTokenUseCase, useValue: {} },
        { provide: LogoutUserUseCase, useValue: {} },
        { provide: GetOnboardingStatusUseCase, useValue: {} },
        { provide: ForgotPasswordUseCase, useValue: {} },
        { provide: ResetPasswordUseCase, useValue: {} },
        { provide: SetPasswordUseCase, useValue: {} },
        { provide: GetSocialRegisterInfoUseCase, useValue: {} },
        { provide: GeneratePasskeyRegistrationOptionsUseCase, useValue: {} },
        { provide: VerifyPasskeyRegistrationUseCase, useValue: {} },
        { provide: GeneratePasskeyLoginOptionsUseCase, useValue: {} },
        { provide: VerifyPasskeyLoginUseCase, useValue: {} },
        { provide: CheckSecurityContextUseCase, useValue: {} },
        { provide: GetSessionsUseCase, useValue: {} },
        { provide: RevokeSessionUseCase, useValue: {} },
        { provide: ImpersonateUserUseCase, useValue: {} },
        { provide: ChangePasswordUseCase, useValue: {} },
        { provide: SetupMfaUseCase, useValue: {} },
        { provide: ConfirmMfaUseCase, useValue: {} },
        { provide: Disable2faUseCase, useValue: {} },
        { provide: GenerateBackupCodesUseCase, useValue: {} },
        { provide: Send2faEmailVerificationUseCase, useValue: {} },
        { provide: Verify2faEmailVerificationUseCase, useValue: {} },
        { provide: ListUsersUseCase, useValue: {} },
        { provide: GetJobTitlesUseCase, useValue: {} },
        { provide: GetUserProfileUseCase, useValue: {} },
        { provide: GetAuditLogsUseCase, useValue: {} },
        { provide: UpdateUserProfileUseCase, useValue: {} },
        { provide: UpdateUserUseCase, useValue: {} },
        { provide: DeleteUserUseCase, useValue: {} },
        { provide: InviteUserUseCase, useValue: {} },
        { provide: ForceLogoutUseCase, useValue: {} },
        { provide: BlockUserUseCase, useValue: {} },
        { provide: UploadAvatarUseCase, useValue: {} },
        { provide: ListTenantsUseCase, useValue: {} },
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return an operational status payload', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual(
        expect.objectContaining({
          status: 'ok',
        }),
      );
    });
  });
});
