import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {
    LoginUserUseCase,
    VerifyMfaUseCase,
    RefreshTokenUseCase,
    InitiateSignupUseCase,
    VerifySignupUseCase,
    CompleteOnboardingUseCase,
    CheckSecurityContextUseCase,
    LogoutUserUseCase,
    HandleSocialLoginUseCase,
    GeneratePasskeyRegistrationOptionsUseCase,
    VerifyPasskeyRegistrationUseCase,
    GeneratePasskeyLoginOptionsUseCase,
    VerifyPasskeyLoginUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    SetPasswordUseCase,
    GetSocialRegisterInfoUseCase,
    GetSessionsUseCase,
    RevokeSessionUseCase,
    ImpersonateUserUseCase,
    ChangePasswordUseCase,
    SetupMfaUseCase,
    ConfirmMfaUseCase,
    Disable2faUseCase,
    GenerateBackupCodesUseCase,
    Send2faEmailVerificationUseCase,
    Verify2faEmailVerificationUseCase
} from '@virteex/domain-identity-application';
import { RequestContextService } from '../services/request-context.service';
import { CookiePolicyService } from '../services/cookie-policy.service';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('AuthController', () => {
  let controller: AuthController;

  const mockUseCase = () => ({
    execute: vi.fn()
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: LoginUserUseCase, useValue: mockUseCase() },
        { provide: VerifyMfaUseCase, useValue: mockUseCase() },
        { provide: RefreshTokenUseCase, useValue: mockUseCase() },
        { provide: InitiateSignupUseCase, useValue: mockUseCase() },
        { provide: VerifySignupUseCase, useValue: mockUseCase() },
        { provide: CompleteOnboardingUseCase, useValue: mockUseCase() },
        { provide: CheckSecurityContextUseCase, useValue: mockUseCase() },
        { provide: LogoutUserUseCase, useValue: mockUseCase() },
        { provide: HandleSocialLoginUseCase, useValue: mockUseCase() },
        { provide: GeneratePasskeyRegistrationOptionsUseCase, useValue: mockUseCase() },
        { provide: VerifyPasskeyRegistrationUseCase, useValue: mockUseCase() },
        { provide: GeneratePasskeyLoginOptionsUseCase, useValue: mockUseCase() },
        { provide: VerifyPasskeyLoginUseCase, useValue: mockUseCase() },
        { provide: ForgotPasswordUseCase, useValue: mockUseCase() },
        { provide: ResetPasswordUseCase, useValue: mockUseCase() },
        { provide: SetPasswordUseCase, useValue: mockUseCase() },
        { provide: GetSocialRegisterInfoUseCase, useValue: mockUseCase() },
        { provide: GetSessionsUseCase, useValue: mockUseCase() },
        { provide: RevokeSessionUseCase, useValue: mockUseCase() },
        { provide: ImpersonateUserUseCase, useValue: mockUseCase() },
        { provide: ChangePasswordUseCase, useValue: mockUseCase() },
        { provide: SetupMfaUseCase, useValue: mockUseCase() },
        { provide: ConfirmMfaUseCase, useValue: mockUseCase() },
        { provide: Disable2faUseCase, useValue: mockUseCase() },
        { provide: GenerateBackupCodesUseCase, useValue: mockUseCase() },
        { provide: Send2faEmailVerificationUseCase, useValue: mockUseCase() },
        { provide: Verify2faEmailVerificationUseCase, useValue: mockUseCase() },
        {
          provide: RequestContextService,
          useValue: {
            extractIp: vi.fn().mockReturnValue('127.0.0.1'),
            getGeoLocation: vi.fn()
          }
        },
        {
          provide: CookiePolicyService,
          useValue: {
            setAuthCookies: vi.fn(),
            clearAuthCookies: vi.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call LoginUserUseCase and set cookies', async () => {
      const dto = { email: 'test@test.com', password: 'password', rememberMe: true, recaptchaToken: 'token' };
      const req = { headers: {} } as any;
      const res = {} as any;
      const result = { accessToken: 'access', refreshToken: 'refresh', expiresIn: 3600, mfaRequired: false };

      const loginUseCase = (controller as any).loginUserUseCase;
      loginUseCase.execute.mockResolvedValue(result);

      const response = await controller.login(dto, req, res);

      expect(loginUseCase.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
      expect((controller as any).cookiePolicyService.setAuthCookies).toHaveBeenCalledWith(res, 'access', 'refresh', true);
    });
  });

  describe('signup', () => {
      it('should initiate signup', async () => {
          const dto = { email: 'test@test.com', password: 'password', recaptchaToken: 'token' };
          const initiateUseCase = (controller as any).initiateSignupUseCase;
          initiateUseCase.execute.mockResolvedValue(undefined);

          const response = await controller.initiateSignup(dto);

          expect(initiateUseCase.execute).toHaveBeenCalledWith(dto);
          expect(response).toEqual({ message: 'OTP sent' });
      });

      it('should complete onboarding and set cookies', async () => {
          const dto = {
              onboardingToken: 'token',
              firstName: 'John',
              lastName: 'Doe',
              companyName: 'ACME',
              country: 'DO',
              taxId: '123',
              industry: 'tech',
              regime: 'standard',
              recaptchaToken: 'captcha'
          };
          const req = { headers: {} } as any;
          const res = {} as any;
          const result = { accessToken: 'access', refreshToken: 'refresh', expiresIn: 3600 };

          const completeUseCase = (controller as any).completeOnboardingUseCase;
          completeUseCase.execute.mockResolvedValue(result);

          const response = await controller.completeOnboarding(dto, req, res);

          expect(completeUseCase.execute).toHaveBeenCalled();
          expect(response).toEqual(result);
          expect((controller as any).cookiePolicyService.setAuthCookies).toHaveBeenCalledWith(res, 'access', 'refresh');
      });
  });
});
