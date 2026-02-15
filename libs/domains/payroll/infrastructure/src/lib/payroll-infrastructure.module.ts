import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  TaxTable,
  Employee,
  Payroll,
  Attendance,
  PayrollDetail,
  EMPLOYEE_REPOSITORY,
  PAYROLL_REPOSITORY,
  TAX_TABLE_REPOSITORY,
  TAX_SERVICE,
  ATTENDANCE_REPOSITORY
} from '../../../domain/src/index';
import { MikroOrmEmployeeRepository } from './repositories/mikro-orm-employee.repository';
import { MikroOrmPayrollRepository } from './repositories/mikro-orm-payroll.repository';
import { MikroOrmTaxTableRepository } from './repositories/mikro-orm-tax-table.repository';
import { MikroOrmAttendanceRepository } from './repositories/mikro-orm-attendance.repository';
import { MexicanTaxService } from './services/mexican-tax.service';

@Module({
  imports: [MikroOrmModule.forFeature([TaxTable, Employee, Payroll, Attendance, PayrollDetail])],
  providers: [
    { provide: EMPLOYEE_REPOSITORY, useClass: MikroOrmEmployeeRepository },
    { provide: PAYROLL_REPOSITORY, useClass: MikroOrmPayrollRepository },
    { provide: TAX_TABLE_REPOSITORY, useClass: MikroOrmTaxTableRepository },
    { provide: TAX_SERVICE, useClass: MexicanTaxService },
    { provide: ATTENDANCE_REPOSITORY, useClass: MikroOrmAttendanceRepository },
  ],
  exports: [
    EMPLOYEE_REPOSITORY,
    PAYROLL_REPOSITORY,
    TAX_TABLE_REPOSITORY,
    TAX_SERVICE,
    ATTENDANCE_REPOSITORY
  ],
})
export class PayrollInfrastructureModule {}
