import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { User, UserRepository, NotificationService, AuthService } from '@virteex/identity-domain';
import { InviteUserDto } from '../dto/invite-user.dto';

@Injectable()
export class InviteUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(NotificationService) private readonly notificationService: NotificationService,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  async execute(dto: InviteUserDto, currentUserId: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const currentUser = await this.userRepository.findById(currentUserId);
    if (!currentUser) throw new Error('Inviter not found');

    const tempPassword = Math.random().toString(36).slice(-8);
    const passwordHash = await this.authService.hashPassword(tempPassword);

    const user = new User(
      dto.email,
      passwordHash,
      dto.firstName,
      dto.lastName,
      currentUser.country,
      currentUser.company
    );
    user.role = dto.role;

    await this.userRepository.save(user);
    await this.notificationService.sendWelcomeEmail(user, tempPassword);

    return user;
  }
}
