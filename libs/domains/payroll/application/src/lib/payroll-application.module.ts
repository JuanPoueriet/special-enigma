import { Module } from '@nestjs/common';
import { CalculatePayrollUseCase } from './use-cases/calculate-payroll.use-case';

@Module({
  providers: [CalculatePayrollUseCase],
  exports: [CalculatePayrollUseCase]
})
export class PayrollApplicationModule {}
