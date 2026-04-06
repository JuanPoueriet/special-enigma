import { Controller, Inject, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AuthService,
} from '@virtex/domain-identity-domain';
import {
  LoginUserUseCase,
  VerifyMfaUseCase,
  RefreshTokenUseCase,
  LogoutUserUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  SetPasswordUseCase,
  GetSocialRegisterInfoUseCase,
  GeneratePasskeyRegistrationOptionsUseCase,
  VerifyPasskeyRegistrationUseCase,
  GeneratePasskeyLoginOptionsUseCase,
  VerifyPasskeyLoginUseCase,
  GetSessionsUseCase,
  RevokeSessionUseCase,
  HandleSocialLoginUseCase,
} from '@virtex/domain-identity-application';
import { status } from '@grpc/grpc-js';
import { GrpcAuthGuard } from '../guards/grpc-auth.guard';

@Controller()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AuthGrpcController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly verifyMfaUseCase: VerifyMfaUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly setPasswordUseCase: SetPasswordUseCase,
    private readonly getSocialRegisterInfoUseCase: GetSocialRegisterInfoUseCase,
    private readonly generatePasskeyRegistrationOptionsUseCase: GeneratePasskeyRegistrationOptionsUseCase,
    private readonly verifyPasskeyRegistrationUseCase: VerifyPasskeyRegistrationUseCase,
    private readonly generatePasskeyLoginOptionsUseCase: GeneratePasskeyLoginOptionsUseCase,
    private readonly verifyPasskeyLoginUseCase: VerifyPasskeyLoginUseCase,
    private readonly getSessionsUseCase: GetSessionsUseCase,
    private readonly revokeSessionUseCase: RevokeSessionUseCase,
    private readonly handleSocialLoginUseCase: HandleSocialLoginUseCase,
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
    const jtis: string[] = [];
    let sessionId: string | undefined;

    if (data.access_token) {
      try {
        const payload = await this.authService.verifyToken(data.access_token, 'access');
        sessionId = payload.sessionId;
        if (payload.jti) jtis.push(payload.jti);
      } catch (e) {
        // Token might be expired
      }
    }

    if (data.refresh_token) {
      try {
        const payload = await this.authService.verifyToken(data.refresh_token, 'refresh');
        if (!sessionId) sessionId = payload.sessionId;
        if (payload.jti) jtis.push(payload.jti);
      } catch (e) {
        // Invalid refresh token
      }
    }

    if (sessionId) {
      await this.logoutUserUseCase.execute(sessionId, jtis.length > 0 ? jtis : undefined);
    }

    return {};
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

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'GetPasskeyRegisterOptions')
  async getPasskeyRegisterOptions(data: any) {
    const options = await this.generatePasskeyRegistrationOptionsUseCase.execute(data.user.sub);
    return { options_json: JSON.stringify(options) };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'VerifyPasskeyRegister')
  async verifyPasskeyRegister(data: any) {
    await this.verifyPasskeyRegistrationUseCase.execute(
      data.user.sub,
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

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'GetSessions')
  async getSessions(data: any) {
    const sessions = await this.getSessionsUseCase.execute(data.user.sub);
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

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'RevokeSession')
  async revokeSession(data: any) {
    await this.revokeSessionUseCase.execute(data.user.sub, data.session_id);
    return {};
  }

  @GrpcMethod('IdentityService', 'HandleSocialLogin')
  async handleSocialLogin(data: any) {
    const result = await this.handleSocialLoginUseCase.execute(
      {
        id: data.profile.id,
        email: data.profile.email,
        firstName: data.profile.first_name,
        lastName: data.profile.last_name,
        provider: data.profile.provider,
      },
      {
        ip: data.context.ip,
        userAgent: data.context.user_agent || data.context.userAgent,
      }
    );

    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
      mfa_required: result.mfaRequired,
    };
  }
}
