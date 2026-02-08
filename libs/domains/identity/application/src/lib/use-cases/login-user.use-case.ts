import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserRepository, AuthService } from '@virteex-erp/identity-domain';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  async execute(dto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.authService.verifyPassword(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    const token = await this.authService.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.company.id, // Assuming loaded, otherwise user.company might be a reference
      country: user.country
    });

    // Refresh token logic would be here
    const refreshToken = 'mock-refresh-token';

    return {
      accessToken: token,
      refreshToken: refreshToken,
      expiresIn: 3600 // 1 hour
    };
  }
}
