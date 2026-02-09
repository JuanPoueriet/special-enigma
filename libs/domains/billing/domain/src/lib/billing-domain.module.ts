import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaxCalculatorService } from '@virteex/billing-domain/lib/services/tax-calculator.service';
import { TaxRuleEngine } from '@virteex/billing-domain/lib/services/tax-rule.engine';
import { FiscalStampingService } from '@virteex/billing-domain/lib/services/fiscal-stamping.service';
import { TaxRule } from '@virteex/billing-domain/lib/entities/tax-rule.entity';
import { Invoice } from '@virteex/billing-domain/lib/entities/invoice.entity';
import { TaxLine } from '@virteex/billing-domain/lib/entities/tax-line.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Invoice, TaxLine, TaxRule])
  ],
  providers: [
    TaxCalculatorService,
    TaxRuleEngine,
    FiscalStampingService
  ],
  exports: [
    TaxCalculatorService,
    TaxRuleEngine,
    FiscalStampingService,
    MikroOrmModule
  ]
})
export class BillingDomainModule {}
