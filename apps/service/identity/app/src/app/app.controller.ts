import { Controller, Get, Inject } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthService, UserRepository } from '@virtex/domain-identity-domain';
import { LoginUserUseCase } from '@virtex/domain-identity-application';
import { status } from '@grpc/grpc-js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @GrpcMethod('IdentityService', 'GetMe')
  async getMe(data: { access_token: string }) {
    try {
      const payload = await this.authService.verifyToken(data.access_token);
      const user = await this.userRepository.findById(payload.sub);

      if (!user) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User not found',
        });
      }

      return {
        sub: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      };
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
      // We wrap the existing use case which handles all logic (audit, lock, risk, etc.)
      const result = await this.loginUserUseCase.execute({
        email: data.email,
        password: data.password,
        recaptchaToken: 'grpc-bypass', // In gRPC we might need a different strategy for recaptcha
        rememberMe: false
      });

      if (result.mfaRequired) {
          throw new RpcException({
              code: status.PERMISSION_DENIED,
              message: 'MFA Required',
          });
      }

      return {
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        expires_in: result.expiresIn,
      };
    } catch (e: any) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: e.message || 'Login failed',
      });
    }
  }
}
