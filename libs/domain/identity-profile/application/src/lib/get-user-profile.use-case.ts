
import { Injectable, Inject } from '@nestjs/common';
import { UserIdentity } from '@virtex/domain-identity-profile-domain';

@Injectable()
export class GetUserProfileUseCase {
  constructor(
    @Inject('UserIdentityRepository') private readonly repository: any,
  ) {}

  async execute(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
