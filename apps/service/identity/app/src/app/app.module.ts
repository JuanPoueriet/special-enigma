import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TenantModule } from '@virtex/kernel-tenant';
import { AuthModule } from '@virtex/kernel-auth';
import { HealthModule } from '@virtex/shared-util-server-health';
import { TelemetryModule } from '@virtex/kernel-telemetry';
import { IdentityInfrastructureModule } from '@virtex/domain-identity-infrastructure';
import { IdentityPresentationModule } from '@virtex/domain-identity-presentation';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RpcAwareThrottlerGuard } from './guards/rpc-aware-throttler.guard';
import { AuthGrpcController } from './controllers/auth.grpc.controller';
import { UsersGrpcController } from './controllers/users.grpc.controller';
import { OnboardingGrpcController } from './controllers/onboarding.grpc.controller';
import { LocalizationGrpcController } from './controllers/localization.grpc.controller';
import { AdminGrpcController } from './controllers/admin.grpc.controller';

@Module({
  imports: [
    TenantModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    EventEmitterModule.forRoot(),
    MikroOrmModule.forRootAsync({
      driver: PostgreSqlDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isPostgres = configService.get('DB_DRIVER') === 'postgres';
        return {
          driver: isPostgres ? PostgreSqlDriver : SqliteDriver,
          host: isPostgres
            ? configService.get<string>('IDENTITY_DB_HOST') ||
              configService.get<string>('DB_HOST')
            : undefined,
          port: isPostgres
            ? configService.get<number>('IDENTITY_DB_PORT') ||
              configService.get<number>('DB_PORT')
            : undefined,
          user: isPostgres
            ? configService.get<string>('IDENTITY_DB_USER') ||
              configService.get<string>('DB_USER')
            : undefined,
          password: isPostgres
            ? configService.get<string>('IDENTITY_DB_PASSWORD') ||
              configService.get<string>('DB_PASSWORD')
            : undefined,
          dbName: (() => {
            const dbName = configService.get<string>('IDENTITY_DB_NAME');
            if (dbName) {
              return dbName;
            }

            if (isPostgres) {
              throw new Error(
                'IDENTITY_DB_NAME environment variable is required when DB_DRIVER=postgres.',
              );
            }

            return 'identity.sqlite3';
          })(),
          autoLoadEntities: true,
          driverOptions:
            isPostgres && configService.get<boolean>('DB_SSL_ENABLED')
              ? {
                  connection: {
                    ssl: {
                      rejectUnauthorized:
                        configService.get('NODE_ENV') === 'production' ||
                        process.env.RELEASE_STAGE === 'production'
                          ? true
                          : configService.get('DB_SSL_REJECT_UNAUTHORIZED') !==
                            'false',
                    },
                  },
                }
              : undefined,
        };
      },
    }),
    IdentityInfrastructureModule,
    IdentityPresentationModule,
    HealthModule,
    TelemetryModule,
  ],
  controllers: [
    AppController,
    AuthGrpcController,
    UsersGrpcController,
    OnboardingGrpcController,
    LocalizationGrpcController,
    AdminGrpcController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RpcAwareThrottlerGuard,
    },
  ],
})
export class AppModule {}
