import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  User, Company, AuditLog, Session,
  UserRepository, CompanyRepository, AuditLogRepository, SessionRepository,
  AuthService, NotificationService, RiskEngineService
} from '@virteex/identity-domain';

import { MikroOrmUserRepository } from './persistence/mikro-orm-user.repository';
import { MikroOrmCompanyRepository } from './persistence/mikro-orm-company.repository';
import { MikroOrmAuditLogRepository } from './persistence/mikro-orm-audit-log.repository';
import { MikroOrmSessionRepository } from './persistence/mikro-orm-session.repository';

import { NodeCryptoAuthService } from './services/node-crypto-auth.service';
import { NodemailerNotificationService } from './services/nodemailer-notification.service';
import { DefaultRiskEngineService } from './services/risk-engine.service';

import {
  RegisterUserUseCase, LoginUserUseCase, VerifyMfaUseCase, StoragePort,
  GetUserProfileUseCase, UpdateUserProfileUseCase, InviteUserUseCase, UploadAvatarUseCase
} from '@virteex/identity-application';
import { SharedInfrastructureStorageModule } from '@virteex/shared-infrastructure-storage';
import { StorageAdapter } from './adapters/storage.adapter';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Company, AuditLog, Session]),
    SharedInfrastructureStorageModule
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
    { provide: StoragePort, useClass: StorageAdapter },

    // Application Use Cases
    RegisterUserUseCase,
    LoginUserUseCase,
    VerifyMfaUseCase,
    GetUserProfileUseCase,
    UpdateUserProfileUseCase,
    InviteUserUseCase,
    UploadAvatarUseCase
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    VerifyMfaUseCase,
    GetUserProfileUseCase,
    UpdateUserProfileUseCase,
    InviteUserUseCase,
    UploadAvatarUseCase,
    StoragePort,
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
