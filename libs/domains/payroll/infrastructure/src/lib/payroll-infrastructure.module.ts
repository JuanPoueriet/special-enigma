import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Employee,
  Payroll,
  PayrollDetail,
  Attendance,
  PAYROLL_REPOSITORY,
  EMPLOYEE_REPOSITORY,
  TAX_SERVICE
} from '../../../domain/src/index';
import { MikroOrmPayrollRepository } from './repositories/mikro-orm-payroll.repository';
import { MikroOrmEmployeeRepository } from './repositories/mikro-orm-employee.repository';
import { MexicanTaxService } from './services/mexican-tax.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Employee, Payroll, PayrollDetail, Attendance])
  ],
  providers: [
    {
      provide: PAYROLL_REPOSITORY,
      useClass: MikroOrmPayrollRepository
    },
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: MikroOrmEmployeeRepository
    },
    {
      provide: TAX_SERVICE,
      useClass: MexicanTaxService
    }
  ],
  exports: [
    PAYROLL_REPOSITORY,
    EMPLOYEE_REPOSITORY,
    TAX_SERVICE,
    MikroOrmModule
  ]
})
export class PayrollInfrastructureModule {}
