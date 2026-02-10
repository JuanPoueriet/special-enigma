import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerConfigModule } from '@virteex/shared-util-server-config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
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
// import { CrmPresentationModule } from '@virteex/crm-presentation'; // Disabled due to persistent build error
import { TreasuryPresentationModule } from '@virteex/treasury-presentation';
import { ProjectsPresentationModule } from '@virteex/projects-presentation';
import { ManufacturingPresentationModule } from '@virteex/manufacturing-presentation';
import { BiPresentationModule } from '@virteex/bi-presentation';
import { AdminPresentationModule } from '@virteex/admin-presentation';
import { FiscalPresentationModule } from '@virteex/fiscal-presentation';
import { CatalogPresentationModule } from '@virteex/catalog-presentation';

@Module({
  imports: [
    ServerConfigModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100, // Reasonable limit
      },
    ]),
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
    // CrmPresentationModule,
    TreasuryPresentationModule,
    ProjectsPresentationModule,
    ManufacturingPresentationModule,
    BiPresentationModule,
    AdminPresentationModule,
    FiscalPresentationModule,
    CatalogPresentationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
