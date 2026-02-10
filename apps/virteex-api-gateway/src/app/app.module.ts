import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerConfigModule } from '@virteex/shared-util-server-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingDomainModule } from '@virteex/billing-domain';
import { BillingInfrastructureModule } from '@virteex/billing-infrastructure';
import { IdentityInfrastructureModule } from '@virteex/identity-infrastructure';
import { IdentityPresentationModule } from '@virteex/identity-presentation';

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
        driverOptions: configService.get<boolean>('DB_SSL_ENABLED') ? {
          connection: { ssl: { rejectUnauthorized: false } }
        } : undefined,
      }),
    }),
    BillingDomainModule,
    BillingInfrastructureModule,
    IdentityInfrastructureModule,
    IdentityPresentationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
