import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaxTable } from '@virteex/payroll-domain';
import { MikroOrmTaxTableRepository } from './repositories/mikro-orm-tax-table.repository';
import { MexicanTaxService } from './services/mexican-tax.service';

@Module({
  imports: [MikroOrmModule.forFeature([TaxTable])],
  providers: [
    {
      provide: 'TaxTableRepository',
      useClass: MikroOrmTaxTableRepository,
    },
    {
      provide: 'TaxService',
      useClass: MexicanTaxService,
    },
  ],
  exports: ['TaxTableRepository', 'TaxService'],
})
export class PayrollInfrastructureModule {}
