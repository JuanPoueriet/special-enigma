import { Injectable } from '@nestjs/common';
import { LocalizationConfigDto, TaxLookupDto, FiscalRegionDto } from '@virteex/domain-identity-contracts';
import { LocalizationPort } from '@virteex/domain-identity-domain';
import * as countries from './countries.json';

@Injectable()
export class LocalizationService extends LocalizationPort {
  private readonly configs: Record<string, LocalizationConfigDto> = countries;

  async getConfig(code: string): Promise<LocalizationConfigDto> {
    return this.configs[code.toUpperCase()] || {
        countryCode: code.toUpperCase(),
        name: code.toUpperCase(),
        currency: 'USD',
        locale: 'en-US',
        taxIdRegex: '^[A-Za-z0-9\\-\\s]+$',
        fiscalRegionId: 'GEN'
    };
  }

  async lookup(taxId: string, country: string): Promise<TaxLookupDto> {
    if (taxId.startsWith('000')) {
      return {
        taxId,
        country,
        name: '',
        isValid: false
      };
    }

    const config = this.configs[country.toUpperCase()];
    if (config && config.taxIdRegex) {
        const regex = new RegExp(config.taxIdRegex);
        if (!regex.test(taxId)) {
            return {
                taxId,
                country,
                name: '',
                isValid: false
            };
        }
    }

    // In a real production environment, this would call a real fiscal provider.
    // Since we don't have a specific provider for generic lookups here yet,
    // we return isValid: true but without simulated names if it passed the regex.
    return {
      taxId,
      country,
      name: '', // Empty name as we don't have a real source yet
      industry: undefined,
      isValid: true
    };
  }
}
