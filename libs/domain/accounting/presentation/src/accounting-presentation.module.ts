import { Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountingApplicationModule } from '@virteex/domain-accounting-application';
import { AccountingController } from './http/controllers/accounting.controller';
import { AccountingHealthController } from './http/controllers/accounting-health.controller';
import { AccountingEventsController } from './http/controllers/accounting-events.controller';
import { AccountingListener } from './events/accounting.listener';
import { AccountsResolver } from './graphql/accounts.resolver';
import { JournalEntriesResolver } from './graphql/journal-entries.resolver';
import { AccountLoader } from './graphql/account.loader';
import { AccountingExceptionFilter } from './filters/accounting-exception.filter';
import { TenantGuard } from './guards/tenant.guard';
import { PresentationLoggingInterceptor } from './interceptors/presentation-logging.interceptor';

/**
 * Presentation module for the Accounting domain.
 * This module configures HTTP controllers, GraphQL resolvers, and Event listeners.
 * It also handles microservice integration for event-driven flows (e.g. Kafka).
 */
@Module({
  imports: [
    AccountingApplicationModule,
    TerminusModule,
    ConfigModule,
    // Explicitly register clients if needed for request-response,
    // or just ensure transport is configured in main.ts for @EventPattern
    ClientsModule.registerAsync([
      {
        name: 'ACCOUNTING_KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: (configService.get<string>('KAFKA_BROKERS') || 'localhost:9092').split(','),
            },
            consumer: {
              groupId: 'accounting-service-consumer',
            }
          }
        }),
      },
    ]),
  ],
  controllers: [AccountingController, AccountingEventsController, AccountingHealthController],
  providers: [
    AccountingListener,
    AccountsResolver,
    JournalEntriesResolver,
    AccountLoader,
    {
      provide: APP_FILTER,
      useClass: AccountingExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: TenantGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PresentationLoggingInterceptor,
    },
  ],
  exports: [AccountLoader]
})
export class AccountingPresentationModule {}
