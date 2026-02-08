import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingDomainModule } from '@virteex/billing-domain';
import { BillingInfrastructureModule } from '@virteex/billing-infrastructure';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      autoLoadEntities: true,
      driverOptions: process.env.DB_SSL_ENABLED === 'true' ? {
        connection: { ssl: { rejectUnauthorized: false } }
      } : undefined,
    }),
    BillingDomainModule,
    BillingInfrastructureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
