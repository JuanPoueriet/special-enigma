import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './register-user.use-case';
import {
  UserRepository, CompanyRepository, AuditLogRepository,
  AuthService, NotificationService, RiskEngineService
} from '@virteex-erp/identity-domain';
import { BadRequestException } from '@nestjs/common';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: UserRepository;
  let companyRepository: CompanyRepository;
  let authService: AuthService;
  let auditLogRepository: AuditLogRepository;
  let notificationService: NotificationService;
  let riskEngineService: RiskEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: UserRepository,
          useValue: { findByEmail: jest.fn(), save: jest.fn() }
        },
        {
          provide: CompanyRepository,
          useValue: { findByTaxId: jest.fn(), save: jest.fn() }
        },
        {
          provide: AuthService,
          useValue: {
              hashPassword: jest.fn().mockResolvedValue('hashed'),
              generateMfaSecret: jest.fn().mockReturnValue('mock-secret')
          }
        },
        {
          provide: NotificationService,
          useValue: { sendWelcomeEmail: jest.fn().mockResolvedValue(true) }
        },
        {
          provide: AuditLogRepository,
          useValue: { save: jest.fn() }
        },
        {
          provide: RiskEngineService,
          useValue: { calculateRisk: jest.fn().mockResolvedValue(0) }
        }
      ]
    }).compile();

    useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
    companyRepository = module.get<CompanyRepository>(CompanyRepository);
    authService = module.get<AuthService>(AuthService);
    auditLogRepository = module.get<AuditLogRepository>(AuditLogRepository);
    notificationService = module.get<NotificationService>(NotificationService);
    riskEngineService = module.get<RiskEngineService>(RiskEngineService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('Tax ID Validation', () => {
    it('should allow valid Colombian NIT', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
        country: 'CO',
        companyName: 'Test Co',
        taxId: '900123456' // 9 digits
      };

      (companyRepository.findByTaxId as jest.Mock).mockResolvedValue(null);
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(useCase.execute(dto)).resolves.toHaveProperty('country', 'CO');
    });

    it('should reject invalid Colombian NIT (too short)', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
        country: 'CO',
        companyName: 'Test Co',
        taxId: '123'
      };
      await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
    });

    it('should allow valid Mexico RFC (Persona Moral)', async () => {
        const dto = {
          email: 'test@mx.com',
          password: 'Password123!',
          firstName: 'Test',
          lastName: 'User',
          country: 'MX',
          companyName: 'Test MX',
          taxId: 'ABC800101XYZ' // 12 chars
        };
        (companyRepository.findByTaxId as jest.Mock).mockResolvedValue(null);
        (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
        await expect(useCase.execute(dto)).resolves.toHaveProperty('country', 'MX');
    });

    it('should reject invalid Mexico RFC (too short)', async () => {
        const dto = {
          email: 'test@mx.com',
          password: 'Password123!',
          firstName: 'Test',
          lastName: 'User',
          country: 'MX',
          companyName: 'Test MX',
          taxId: 'SHORT'
        };
        await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('Risk Assessment', () => {
      it('should log high risk audit if score > 80', async () => {
          const dto = {
            email: 'risk@example.com',
            password: 'Password123!',
            firstName: 'Risk',
            lastName: 'User',
            country: 'US',
            companyName: 'Risk Co',
            taxId: '123456789'
          };
          (companyRepository.findByTaxId as jest.Mock).mockResolvedValue(null);
          (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
          (riskEngineService.calculateRisk as jest.Mock).mockResolvedValue(85);

          await useCase.execute(dto);

          expect(auditLogRepository.save).toHaveBeenCalledWith(
              expect.objectContaining({ event: 'REGISTER_HIGH_RISK' })
          );
      });
  });
});
