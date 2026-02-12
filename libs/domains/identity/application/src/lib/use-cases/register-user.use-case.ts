import { Injectable, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import {
  User, Company, UserRepository, CompanyRepository, AuthService, NotificationService,
  AuditLogRepository, AuditLog, RiskEngineService
} from '@virteex/identity-domain';

export interface RegisterContext {
  ip: string;
  userAgent: string;
  country?: string; // Detected country
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(CompanyRepository) private readonly companyRepository: CompanyRepository,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(NotificationService) private readonly notificationService: NotificationService,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
    @Inject(RiskEngineService) private readonly riskEngineService: RiskEngineService
  ) {}

  async execute(dto: RegisterUserDto, context: RegisterContext = { ip: 'unknown', userAgent: 'unknown' }): Promise<User> {
    // 1. Validate Tax ID Format
    this.validateTaxId(dto.country, dto.taxId);

    // 2. Check for Existing User
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      await this.auditLogRepository.save(new AuditLog('REGISTER_FAILED_DUPLICATE', undefined, { email: dto.email, ip: context.ip }));
      throw new ConflictException('User with this email already exists');
    }

    // 3. Risk Assessment (Pre-registration)
    // If IP country differs significantly from Registration Country, we might want to flag or block.
    // For now, we calculate a score and store it with the user.
    const riskScore = await this.riskEngineService.calculateRisk({
        ip: context.ip,
        country: dto.country, // User claimed country
        userAgent: context.userAgent,
        email: dto.email
    });

    if (riskScore > 80) {
        // In a real system, we might require manual approval or extra verification here.
        // For MVP, we proceed but log a high risk warning.
        await this.auditLogRepository.save(new AuditLog('REGISTER_HIGH_RISK', undefined, { email: dto.email, score: riskScore, context }));
    }

    // 4. Create User & Company
    const passwordHash = await this.authService.hashPassword(dto.password);

    let company = await this.companyRepository.findByTaxId(dto.taxId);
    let role = 'user';

    if (!company) {
      company = new Company(dto.companyName, dto.taxId, dto.country);

      // Default Settings per country
      if (dto.country === 'CO') {
          company.settings = { fiscalRegime: 'ORDINARY', taxProvider: 'DIAN' };
          company.currency = 'COP';
      } else if (dto.country === 'MX') {
          company.settings = { fiscalRegime: 'PERSONA_MORAL', taxProvider: 'SAT' };
          company.currency = 'MXN';
      }

      await this.companyRepository.save(company);
      role = 'admin'; // First user of new company is admin
    }

    const user = new User(
      dto.email,
      passwordHash,
      dto.firstName,
      dto.lastName,
      dto.country,
      company
    );
    user.role = role;
    user.riskScore = riskScore;

    // Generate MFA Secret for all new users (Zero Trust default)
    const rawSecret = this.authService.generateMfaSecret();
    user.mfaSecret = await this.authService.encrypt(rawSecret);
    user.mfaEnabled = true; // Enable by default or based on policy

    // 5. Persist
    await this.userRepository.save(user);

    // Restore raw secret for QR code generation in frontend (in-memory only)
    user.mfaSecret = rawSecret;

    // 6. Audit & Notify
    await this.auditLogRepository.save(new AuditLog('REGISTER_SUCCESS', user.id, { ip: context.ip, userAgent: context.userAgent }));
    await this.notificationService.sendWelcomeEmail(user);

    return user;
  }

  private validateTaxId(country: string, taxId: string): void {
    const countryCode = country.toUpperCase();
    let isValid = true;
    let errorMsg = '';

    switch (countryCode) {
      case 'CO': { // Colombia NIT (9-10 digits)
        // Allow dashes or dots, strip them for validation
        const nit = taxId.replace(/[^0-9]/g, '');
        if (!/^\d{9,10}$/.test(nit)) {
          isValid = false;
          errorMsg = 'Invalid NIT for Colombia. Must be 9-10 digits.';
        }
        break;
      }
      case 'MX': { // Mexico RFC (12-13 chars)
        const rfc = taxId.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (rfc.length < 12 || rfc.length > 13) {
             isValid = false;
             errorMsg = 'Invalid RFC for Mexico. Must be 12-13 alphanumeric characters.';
        } else if (!/^[A-Z&Ñ]{3,4}\d{6}[A-Z0-9]{3}$/.test(rfc)) {
             // More strict regex
             isValid = false;
             errorMsg = 'Invalid RFC format.';
        }
        break;
      }
      case 'US': { // USA EIN (9 digits)
        const ein = taxId.replace(/[^0-9]/g, '');
        if (!/^\d{9}$/.test(ein)) {
          isValid = false;
          errorMsg = 'Invalid EIN for USA. Must be 9 digits.';
        }
        break;
      }
      case 'BR': { // Brazil CNPJ (14 digits)
        const cnpj = taxId.replace(/[^0-9]/g, '');
        if (!/^\d{14}$/.test(cnpj)) {
            isValid = false;
            errorMsg = 'Invalid CNPJ for Brazil. Must be 14 digits.';
        }
        break;
      }
      default:
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
