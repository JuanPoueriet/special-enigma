import { Injectable } from '@nestjs/common';
import { FiscalProvider } from '@virteex/domain-fiscal-domain';
import { SatFiscalAdapter } from '../adapters/sat-fiscal-provider.adapter';
import { SefazFiscalAdapter } from '../adapters/sefaz-fiscal-provider.adapter';
import { DianFiscalAdapter } from '../adapters/dian-fiscal-provider.adapter';
import { UsTaxPartnerFiscalAdapter } from '../adapters/us-tax-partner-fiscal-provider.adapter';
import { DgiiFiscalAdapter } from '../adapters/dgii-fiscal-provider.adapter';

@Injectable()
export class FiscalProviderFactory {
  constructor(
    private readonly mx: SatFiscalAdapter,
    private readonly br: SefazFiscalAdapter,
    private readonly co: DianFiscalAdapter,
    private readonly us: UsTaxPartnerFiscalAdapter,
    private readonly doProvider: DgiiFiscalAdapter
  ) {}

  getProvider(country: string): FiscalProvider {
    switch (country?.toUpperCase()) {
      case 'MX':
      case 'MEXICO':
        return this.mx;
      case 'BR':
      case 'BRAZIL':
        return this.br;
      case 'CO':
      case 'COLOMBIA':
        return this.co;
      case 'US':
      case 'USA':
        return this.us;
      case 'DO':
      case 'DOMINICAN REPUBLIC':
      case 'REPUBLICA DOMINICANA':
        return this.doProvider;
      default:
        // Default to MX for backward compatibility or throw error
        return this.mx;
    }
  }
}
