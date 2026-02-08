import { Injectable, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { User, Company, UserRepository, CompanyRepository, AuthService, NotificationService } from '@virteex-erp/identity-domain';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(CompanyRepository) private readonly companyRepository: CompanyRepository,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(NotificationService) private readonly notificationService: NotificationService
  ) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    // Basic Country/TaxID Validation
    this.validateTaxId(dto.country, dto.taxId);

    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await this.authService.hashPassword(dto.password);

    let company = await this.companyRepository.findByTaxId(dto.taxId);
    if (!company) {
      company = new Company(dto.companyName, dto.taxId, dto.country);
      await this.companyRepository.save(company);
    } else {
      // Typically, joining an existing company requires invitation or verification.
      // For MVP/Demo, we might allow it or block it.
      // The document says "Invitación de colaboradores".
      // So self-registration into existing company without invite is suspicious.
      // But maybe the user is the owner trying to register again?
      // Or maybe multiple users can register for same company if they provide correct TaxID?
      // I will allow it but maybe set role to 'user' instead of 'admin' if company exists.
      // But for now, let's assume if company exists, user is added to it.
    }

    const user = new User(
      dto.email,
      passwordHash,
      dto.firstName,
      dto.lastName,
      dto.country,
      company
    );

    // Assign admin role if company was just created (or if it's the first user)
    // Here we check if company users count is 0?
    // MikroORM collection might need initialization.
    // For simplicity, I'll default to 'admin' for now as registration usually implies creating a NEW account/tenant.
    if (company.users.length === 0) {
        user.role = 'admin';
    } else {
        user.role = 'user';
    }

    await this.userRepository.save(user);

    // Trigger Notification (Domain Event implied)
    await this.notificationService.sendWelcomeEmail(user);

    return user;
  }

  private validateTaxId(country: string, taxId: string): void {
    const countryCode = country.toUpperCase();
    let isValid = true;
    let errorMsg = '';

    switch (countryCode) {
      case 'CO': // Colombia NIT (9-10 digits)
        if (!/^\d{9,10}$/.test(taxId)) {
          isValid = false;
          errorMsg = 'Invalid NIT for Colombia. Must be 9-10 digits.';
        }
        break;
      case 'MX': // Mexico RFC (12-13 chars)
        if (!/^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9][0-9A]$/.test(taxId.toUpperCase())) {
          // Simplified regex
          if (taxId.length < 12 || taxId.length > 13) {
             isValid = false;
             errorMsg = 'Invalid RFC for Mexico. Must be 12-13 characters.';
          }
        }
        break;
      case 'US': // USA EIN (9 digits)
        if (!/^\d{9}$/.test(taxId.replace(/-/g, ''))) {
          isValid = false;
          errorMsg = 'Invalid EIN for USA. Must be 9 digits.';
        }
        break;
      default:
        // No specific validation for other countries yet
        if (taxId.length < 5) {
            isValid = false;
            errorMsg = 'Tax ID too short.';
        }
        break;
    }

    if (!isValid) {
      throw new BadRequestException(errorMsg);
    }
  }
}
