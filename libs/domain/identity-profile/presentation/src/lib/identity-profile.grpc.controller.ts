
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserProfileUseCase, UpdateUserProfileUseCase } from '@virtex/domain-identity-profile-application';

@Controller()
export class IdentityProfileGrpcController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
  ) {}

  @GrpcMethod('IdentityProfileService', 'GetUserProfile')
  async getUserProfile(data: any) {
    return await this.getUserProfileUseCase.execute(data.userId);
  }

  @GrpcMethod('IdentityProfileService', 'UpdateUserProfile')
  async updateUserProfile(data: any) {
    return await this.updateUserProfileUseCase.execute(data.userId, data);
  }
}
