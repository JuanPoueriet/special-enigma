import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerConfigModule, IdempotencyInterceptor } from '@virteex/shared-util-server-config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtAuthGuard, JwtTenantMiddleware } from '@virteex/kernel-auth';
import { TenantRlsInterceptor, TenantModule, TenantThrottlerGuard } from '@virteex/kernel-tenant';
import { KafkaModule } from '@virteex/shared-infrastructure-kafka';
import { AuditModule } from '@virteex/kernel-audit';
import { InventoryPresentationModule } from '@virteex/api-inventory-presentation';
import { AccountingPresentationModule } from '@virteex/api-accounting-presentation';
import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { AppService } from './app.service';
import { InitialSeederService } from '@virteex/infra-payroll-infrastructure';

// Cross Domain Infrastructure (Application Level)
import { CrossDomainInfrastructureModule } from './infrastructure/cross-domain.module';

// BFF Modules
import { StoreApiModule } from '../presentation/store-api/store-api.module';
import { createServiceProxy } from './middleware/proxy.middleware';

@Module({
  imports: [
    InventoryPresentationModule,
    AccountingPresentationModule,
    TerminusModule,
    EventEmitterModule.forRoot(),
    KafkaModule.forRoot({
      clientId: 'api-gateway',
      groupId: 'gateway-consumer',
    }),
    AuditModule,
    ServerConfigModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isPostgres = configService.get('DB_DRIVER') === 'postgres';
        return {
          driver: isPostgres ? PostgreSqlDriver : SqliteDriver,
          host: isPostgres ? configService.get<string>('DB_HOST') : undefined,
          port: isPostgres ? configService.get<number>('DB_PORT') : undefined,
          user: isPostgres ? configService.get<string>('DB_USER') : undefined,
          password: isPostgres ? configService.get<string>('DB_PASSWORD') : undefined,
          dbName: configService.get<string>('DB_NAME') || (isPostgres ? 'virteex' : 'virteex.db'),
          autoLoadEntities: true,
          driverOptions: (isPostgres && configService.get<boolean>('DB_SSL_ENABLED'))
            ? {
                connection: { ssl: { rejectUnauthorized: false } },
              }
            : undefined,
        };
      },
    }),

    // Core Modules
    TenantModule,

    // Cross Domain Infrastructure
    CrossDomainInfrastructureModule,

    // BFF Modules
    StoreApiModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    InitialSeederService,
    {
      provide: APP_GUARD,
      useClass: TenantThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantRlsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: IdempotencyInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtTenantMiddleware)
      .forRoutes('*');

    // Proxy Routes for Microservices
    // consumer.apply(createServiceProxy('http://api-accounting:3000')).forRoutes('accounting'); // Running in-process
    // consumer.apply(createServiceProxy('http://api-payroll:3000')).forRoutes('payroll'); // Migrated to GraphQL Federation
    consumer.apply(createServiceProxy('http://api-crm:3000')).forRoutes('crm');
    consumer.apply(createServiceProxy('http://api-projects:3000')).forRoutes('projects');
    consumer.apply(createServiceProxy('http://api-manufacturing:3000')).forRoutes('manufacturing');
    // consumer.apply(createServiceProxy('http://api-inventory:3000')).forRoutes('inventory'); // Running in-process

    // Proxy for GraphQL Gateway
    // Assuming gateway-legacy runs on port 3000 and has global prefix 'api', exposing GraphQL at '/api/graphql'
    // This proxy forwards '/graphql' requests to 'http://gateway-legacy:3000/api/graphql'
    // Note: createServiceProxy with pathRewrite might be needed if exact mapping fails,
    // but here we target the base URL. If request is /graphql, and target is .../api, it becomes .../api/graphql
    consumer.apply(createServiceProxy('http://gateway-legacy:3000/api')).forRoutes('graphql');

    // consumer.apply(createServiceProxy('http://api-treasury:3000')).forRoutes('treasury'); // Migrated to GraphQL Federation
    // consumer.apply(createServiceProxy('http://api-purchasing:3000')).forRoutes('purchasing'); // Migrated to GraphQL Federation
    consumer.apply(createServiceProxy('http://api-bi:3000')).forRoutes('bi');
    consumer.apply(createServiceProxy('http://api-admin:3000')).forRoutes('admin');
    consumer.apply(createServiceProxy('http://api-fixed-assets:3000')).forRoutes('fixed-assets');
  }
}
