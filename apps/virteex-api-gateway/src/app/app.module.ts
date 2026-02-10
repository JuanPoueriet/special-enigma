import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerConfigModule } from '@virteex/shared-util-server-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Existing Modules
import { BillingDomainModule } from '@virteex/billing-domain';
import { BillingInfrastructureModule } from '@virteex/billing-infrastructure';
import { IdentityPresentationModule } from '@virteex/identity-presentation';

// New Modules
import { AccountingPresentationModule } from '@virteex/accounting-presentation';
import { InventoryPresentationModule } from '@virteex/inventory-presentation';
import { PayrollPresentationModule } from '@virteex/payroll-presentation';
import { CrmPresentationModule } from '@virteex/crm-presentation';
import { TreasuryPresentationModule } from '@virteex/treasury-presentation';
import { ProjectsPresentationModule } from '@virteex/projects-presentation';
import { ManufacturingPresentationModule } from '@virteex/manufacturing-presentation';
import { BiPresentationModule } from '@virteex/bi-presentation';
import { AdminPresentationModule } from '@virteex/admin-presentation';
import { FiscalPresentationModule } from '@virteex/fiscal-presentation';

@Module({
  imports: [
    ServerConfigModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        driver: PostgreSqlDriver,
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        user: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        dbName: configService.getOrThrow<string>('DB_NAME'),
        autoLoadEntities: true,
        driverOptions: configService.get<boolean>('DB_SSL_ENABLED')
          ? {
              connection: { ssl: { rejectUnauthorized: false } },
            }
          : undefined,
      }),
    }),
    // Domain Modules
    BillingDomainModule,
    BillingInfrastructureModule,
    IdentityPresentationModule,
    AccountingPresentationModule,
    InventoryPresentationModule,
    PayrollPresentationModule,
    CrmPresentationModule,
    TreasuryPresentationModule,
    ProjectsPresentationModule,
    ManufacturingPresentationModule,
    BiPresentationModule,
    AdminPresentationModule,
    FiscalPresentationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
