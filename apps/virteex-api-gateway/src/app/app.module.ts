import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingDomainModule } from '@virteex-erp/billing-domain';
import { BillingInfrastructureModule } from '@virteex-erp/billing-infrastructure';

@Module({
  imports: [
    BillingDomainModule,
    BillingInfrastructureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
