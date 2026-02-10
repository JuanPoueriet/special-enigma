import { Module } from '@nestjs/common';
import { CalculatePayrollUseCase } from '@virteex/payroll-application/src/lib/use-cases/calculate-payroll.use-case';

@Module({
  providers: [CalculatePayrollUseCase],
  exports: [CalculatePayrollUseCase]
})
export class PayrollApplicationModule {}
