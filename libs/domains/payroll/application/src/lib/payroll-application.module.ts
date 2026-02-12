import { Module } from '@nestjs/common';
import { CalculatePayrollUseCase } from './use-cases/calculate-payroll.use-case';
import { GetEmployeesUseCase } from './use-cases/get-employees.use-case';

@Module({
  providers: [CalculatePayrollUseCase, GetEmployeesUseCase],
  exports: [CalculatePayrollUseCase, GetEmployeesUseCase]
})
export class PayrollApplicationModule {}
