import { TaxProviderPort } from '@virteex/domain-identity-domain';
import { GenericTaxProvider } from './generic-tax-provider';
import { DominicanRepublicTaxProvider } from './dominican-republic-tax-provider';
import { MexicoTaxProvider } from './mexico-tax-provider';
import { USTaxProvider } from './us-tax-provider';
import { HttpService } from '@nestjs/axios';

export class TaxProviderFactory {
  static getProvider(countryCode: string, httpService: HttpService): TaxProviderPort {
    switch (countryCode.toUpperCase()) {
      case 'DO':
        return new DominicanRepublicTaxProvider(httpService);
      case 'MX':
        return new MexicoTaxProvider(httpService);
      case 'US':
        return new USTaxProvider(httpService);
      default:
        return new GenericTaxProvider(countryCode.toUpperCase(), httpService);
    }
  }
}
