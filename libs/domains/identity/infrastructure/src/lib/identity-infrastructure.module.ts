import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User, Company, UserRepository, CompanyRepository, AuthService, NotificationService } from '@virteex-erp/identity-domain';
import { MikroOrmUserRepository } from './persistence/mikro-orm-user.repository';
import { MikroOrmCompanyRepository } from './persistence/mikro-orm-company.repository';
import { NodeCryptoAuthService } from './services/node-crypto-auth.service';
import { ConsoleNotificationService } from './services/console-notification.service';
import { RegisterUserUseCase, LoginUserUseCase } from '@virteex-erp/identity-application';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Company])
  ],
  providers: [
    // Ports Implementations
    { provide: UserRepository, useClass: MikroOrmUserRepository },
    { provide: CompanyRepository, useClass: MikroOrmCompanyRepository },
    { provide: AuthService, useClass: NodeCryptoAuthService },
    { provide: NotificationService, useClass: ConsoleNotificationService },

    // Application Use Cases
    RegisterUserUseCase,
    LoginUserUseCase
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    // Export ports if other modules need them directly
    UserRepository,
    CompanyRepository,
    AuthService
  ]
})
export class IdentityInfrastructureModule {}
