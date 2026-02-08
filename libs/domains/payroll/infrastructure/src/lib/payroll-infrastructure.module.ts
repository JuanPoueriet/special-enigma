import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Employee,
  Payroll,
  PayrollDetail,
  Attendance,
  PAYROLL_REPOSITORY,
  EMPLOYEE_REPOSITORY
} from '@virteex/payroll-domain';
import { MikroOrmPayrollRepository } from './repositories/mikro-orm-payroll.repository';
import { MikroOrmEmployeeRepository } from './repositories/mikro-orm-employee.repository';

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
    }
  ],
  exports: [
    PAYROLL_REPOSITORY,
    EMPLOYEE_REPOSITORY,
    MikroOrmModule
  ]
})
export class PayrollInfrastructureModule {}
