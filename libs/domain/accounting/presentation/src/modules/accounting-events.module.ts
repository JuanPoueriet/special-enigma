import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountingApplicationModule } from '@virteex/domain-accounting-application';
import { AccountingEventsController } from '../http/controllers/accounting-events.controller';
import { AccountingListener } from '../events/accounting.listener';

@Module({
  imports: [
    AccountingApplicationModule,
    ConfigModule,
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
  controllers: [AccountingEventsController],
  providers: [AccountingListener],
})
export class AccountingEventsModule {}
