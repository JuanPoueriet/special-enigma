
import { Module } from '@nestjs/common';
import { GetUserProfileUseCase } from './get-user-profile.use-case';
import { UpdateUserProfileUseCase } from './update-user-profile.use-case';

@Module({
  providers: [GetUserProfileUseCase, UpdateUserProfileUseCase],
  exports: [GetUserProfileUseCase, UpdateUserProfileUseCase],
})
export class DomainIdentityProfileApplicationModule {}
