import { Module } from '@nestjs/common';
import { CalculatePayrollUseCase } from './use-cases/calculate-payroll.use-case';
import { GetEmployeesUseCase } from './use-cases/get-employees.use-case';
import { PayrollInfrastructureModule } from '../../../infrastructure/src/index';

@Module({
  imports: [PayrollInfrastructureModule],
  providers: [CalculatePayrollUseCase, GetEmployeesUseCase],
  exports: [CalculatePayrollUseCase, GetEmployeesUseCase]
})
export class PayrollApplicationModule {}
