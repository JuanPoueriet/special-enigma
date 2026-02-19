import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceConsumer } from './invoice.consumer';
import { KafkaModule } from '@virteex/shared/infrastructure/kafka';
import { FiscalPresentationModule } from '@virteex/fiscal-presentation';
import { FiscalInfrastructureModule, MockFiscalProvider } from '@virteex/fiscal-infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        driver: PostgreSqlDriver,
        host: configService.get<string>('FISCAL_DB_HOST'),
        port: configService.get<number>('FISCAL_DB_PORT'),
        user: configService.get<string>('FISCAL_DB_USER'),
        password: configService.get<string>('FISCAL_DB_PASSWORD'),
        dbName: configService.get<string>('FISCAL_DB_NAME'),
        autoLoadEntities: true,
      }),
    }),
    KafkaModule.forRoot({
      clientId: 'fiscal-service',
      groupId: 'fiscal-consumer',
    }),
    FiscalInfrastructureModule,
    FiscalPresentationModule,
  ],
  controllers: [AppController, InvoiceConsumer],
  providers: [
    AppService,
    {
      provide: 'FiscalProvider',
      useClass: MockFiscalProvider,
    },
  ],
})
export class AppModule {}
