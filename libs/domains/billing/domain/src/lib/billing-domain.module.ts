import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaxCalculatorService } from './services/tax-calculator.service';
import { TaxRuleEngine } from './services/tax-rule.engine';
import { TaxRule } from './entities/tax-rule.entity';
import { Invoice } from './entities/invoice.entity';
import { TaxLine } from './entities/tax-line.entity';
import { FinkokPacProvider } from './infrastructure/finkok-pac.provider';
import { PAC_PROVIDER } from './infrastructure/pac-provider.interface';

@Module({
  imports: [
    MikroOrmModule.forFeature([Invoice, TaxLine, TaxRule])
  ],
  providers: [
    TaxCalculatorService,
    TaxRuleEngine,
    {
      provide: PAC_PROVIDER,
      useClass: FinkokPacProvider
    }
  ],
  exports: [
    TaxCalculatorService,
    TaxRuleEngine,
    PAC_PROVIDER,
    MikroOrmModule
  ]
})
export class BillingDomainModule {}
