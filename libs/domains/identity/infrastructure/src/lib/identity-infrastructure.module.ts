import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  User, Company, AuditLog, Session,
  UserRepository, CompanyRepository, AuditLogRepository, SessionRepository,
  AuthService, NotificationService, RiskEngineService
} from '@virteex/identity-domain';

import { MikroOrmUserRepository } from '@virteex/identity-infrastructure/lib/persistence/mikro-orm-user.repository';
import { MikroOrmCompanyRepository } from '@virteex/identity-infrastructure/lib/persistence/mikro-orm-company.repository';
import { MikroOrmAuditLogRepository } from '@virteex/identity-infrastructure/lib/persistence/mikro-orm-audit-log.repository';
import { MikroOrmSessionRepository } from '@virteex/identity-infrastructure/lib/persistence/mikro-orm-session.repository';

import { NodeCryptoAuthService } from '@virteex/identity-infrastructure/lib/services/node-crypto-auth.service';
import { NodemailerNotificationService } from '@virteex/identity-infrastructure/lib/services/nodemailer-notification.service';
import { DefaultRiskEngineService } from '@virteex/identity-infrastructure/lib/services/risk-engine.service';

import { RegisterUserUseCase, LoginUserUseCase, VerifyMfaUseCase } from '@virteex/identity-application';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Company, AuditLog, Session])
  ],
  providers: [
    // Ports Implementations
    { provide: UserRepository, useClass: MikroOrmUserRepository },
    { provide: CompanyRepository, useClass: MikroOrmCompanyRepository },
    { provide: AuditLogRepository, useClass: MikroOrmAuditLogRepository },
    { provide: SessionRepository, useClass: MikroOrmSessionRepository },

    { provide: AuthService, useClass: NodeCryptoAuthService },
    { provide: NotificationService, useClass: NodemailerNotificationService },
    { provide: RiskEngineService, useClass: DefaultRiskEngineService },

    // Application Use Cases
    RegisterUserUseCase,
    LoginUserUseCase,
    VerifyMfaUseCase
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    VerifyMfaUseCase,
    // Export ports if other modules need them directly
    UserRepository,
    CompanyRepository,
    AuditLogRepository,
    SessionRepository,
    AuthService,
    RiskEngineService
  ]
})
export class IdentityInfrastructureModule {}
