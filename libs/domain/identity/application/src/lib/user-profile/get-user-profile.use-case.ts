import { DomainException } from '@virtex/kernel-exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { User, UserRepository } from '@virtex/domain-identity-domain';

@Injectable()
export class GetUserProfileUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new DomainException('User not found', 'ENTITY_NOT_FOUND');
    }
    return user;
  }
}
