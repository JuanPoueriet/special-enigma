import { Test, TestingModule } from '@nestjs/testing';
import { AuthSessionController } from './auth-session.controller';
import { RequestContextService } from '../services/request-context.service';
import { CookiePolicyService } from '@virtex/kernel-auth';
import {
    LoginUserUseCase,
    RefreshTokenUseCase,
    LogoutUserUseCase,
    GetSessionsUseCase,
    RevokeSessionUseCase,
    ImpersonateUserUseCase,
    CheckSecurityContextUseCase,
    GetUserProfileUseCase
} from '@virtex/domain-identity-application';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('AuthSessionController', () => {
  let controller: AuthSessionController;

  const mockUseCase = () => ({
    execute: vi.fn()
  });

  const providers = [
    { provide: LoginUserUseCase, useValue: mockUseCase() },
    { provide: RefreshTokenUseCase, useValue: mockUseCase() },
    { provide: LogoutUserUseCase, useValue: mockUseCase() },
    { provide: GetSessionsUseCase, useValue: mockUseCase() },
    { provide: RevokeSessionUseCase, useValue: mockUseCase() },
    { provide: ImpersonateUserUseCase, useValue: mockUseCase() },
    { provide: CheckSecurityContextUseCase, useValue: mockUseCase() },
    { provide: GetUserProfileUseCase, useValue: mockUseCase() },
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
  ];

  beforeEach(() => {
    controller = new AuthSessionController(
        providers.find(p => p.provide === LoginUserUseCase)!.useValue as any,
        providers.find(p => p.provide === RefreshTokenUseCase)!.useValue as any,
        providers.find(p => p.provide === LogoutUserUseCase)!.useValue as any,
        providers.find(p => p.provide === GetSessionsUseCase)!.useValue as any,
        providers.find(p => p.provide === RevokeSessionUseCase)!.useValue as any,
        providers.find(p => p.provide === ImpersonateUserUseCase)!.useValue as any,
        providers.find(p => p.provide === GetUserProfileUseCase)!.useValue as any,
        providers.find(p => p.provide === RequestContextService)!.useValue as any,
        providers.find(p => p.provide === CookiePolicyService)!.useValue as any
    );
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
      expect(response).toEqual({ expiresIn: 3600, mfaRequired: false });
      expect((controller as any).cookiePolicyService.setAuthCookies).toHaveBeenCalledWith(res, 'access', 'refresh', true);
    });
  });
});
