import { Module } from '@nestjs/common';
import { PayrollApplicationModule } from '@virteex/payroll-application';
import { PayrollInfrastructureModule } from '@virteex/payroll-infrastructure';
import { PayrollController } from './controllers/payroll.controller';

@Module({
  imports: [
    PayrollApplicationModule,
    PayrollInfrastructureModule
  ],
  controllers: [PayrollController],
  providers: [],
  exports: [PayrollApplicationModule, PayrollInfrastructureModule]
})
export class PayrollPresentationModule {}
