import { DomainException } from '@virtex/kernel-exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { User, UserRepository } from '@virtex/domain-identity-domain';
import { UpdateUserDto } from '@virtex/domain-identity-contracts';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new DomainException('User not found', 'ENTITY_NOT_FOUND');
    }

    user.updateProfile(dto.firstName, dto.lastName, dto.phone, dto.preferredLanguage);

    await this.userRepository.save(user);
    return user;
  }
}
