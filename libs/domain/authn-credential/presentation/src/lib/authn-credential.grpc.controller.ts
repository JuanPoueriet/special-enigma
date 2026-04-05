
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginUserUseCase } from '@virtex/domain-authn-credential-application';

@Controller()
export class AuthnCredentialGrpcController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @GrpcMethod('AuthnCredentialService', 'Login')
  async login(data: any) {
    const result = await this.loginUserUseCase.execute(data);
    return result;
  }
}
