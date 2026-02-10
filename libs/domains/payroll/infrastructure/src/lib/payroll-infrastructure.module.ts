import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaxTable } from '../../../domain/src/index';
import { MikroOrmEmployeeRepository } from './repositories/mikro-orm-employee.repository';
import { MikroOrmPayrollRepository } from './repositories/mikro-orm-payroll.repository';
import { MikroOrmTaxTableRepository } from './repositories/mikro-orm-tax-table.repository';
import { MexicanTaxService } from './services/mexican-tax.service';

@Module({
  imports: [MikroOrmModule.forFeature([TaxTable])],
  providers: [
    MikroOrmEmployeeRepository,
    MikroOrmPayrollRepository,
    MikroOrmTaxTableRepository,
    MexicanTaxService
  ],
  exports: [
    MikroOrmEmployeeRepository,
    MikroOrmPayrollRepository,
    MikroOrmTaxTableRepository,
    MexicanTaxService
  ],
})
export class PayrollInfrastructureModule {}
