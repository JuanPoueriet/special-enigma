import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User, UserRepository } from '@virteex/identity-domain';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.firstName) user.firstName = dto.firstName;
    if (dto.lastName) user.lastName = dto.lastName;
    if (dto.phone) user.phone = dto.phone;

    await this.userRepository.save(user);
    return user;
  }
}
