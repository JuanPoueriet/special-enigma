
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    @Inject('UserIdentityRepository') private readonly repository: any,
  ) {}

  async execute(userId: string, data: any) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.updateProfile(data.firstName, data.lastName, data.phone, data.preferredLanguage);
    await this.repository.save(user);
    return user;
  }
}
