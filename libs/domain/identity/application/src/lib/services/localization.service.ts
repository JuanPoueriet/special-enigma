import { Injectable, Logger, Inject } from '@nestjs/common';
import { LocalizationConfigDto, TaxLookupDto } from '@virtex/domain-identity-contracts';
import { LocalizationPort } from '@virtex/domain-identity-domain';
import * as countries from './countries.json';
import { TaxProviderFactory } from './tax-providers/tax-provider-factory';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LocalizationService extends LocalizationPort {
  private readonly logger = new Logger(LocalizationService.name);
  private readonly configs: Record<string, LocalizationConfigDto> = countries;

  constructor(@Inject(HttpService) private readonly httpService: HttpService) {
    super();
  }

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
    const startTime = Date.now();
    const config = this.configs[country.toUpperCase()];

    // 1. Basic format validation
    if (taxId.startsWith('000')) {
      return this.finalizeLookup({ taxId, country, name: '', isValid: false }, startTime);
    }

    if (config && config.taxIdRegex) {
        const regex = new RegExp(config.taxIdRegex);
        if (!regex.test(taxId)) {
            return this.finalizeLookup({ taxId, country, name: '', isValid: false }, startTime);
        }
    }

    // 2. Business lookup through specific providers
    try {
        const provider = TaxProviderFactory.getProvider(country, this.httpService);
        const result = await provider.lookup(taxId);

        // Ensure name is present for backward compatibility
        if (result.isValid && !result.name && result.legalName) {
            result.name = result.legalName;
        }

        return this.finalizeLookup(result, startTime);
    } catch (error) {
        this.logger.error(`Error performing tax lookup for ${country}:`, error);

        // Fallback for unexpected provider errors: Fail safe (isValid: false)
        const fallbackResult = {
            taxId,
            country,
            name: '',
            isValid: false
        };
        return this.finalizeLookup(fallbackResult, startTime);
    }
  }

  private finalizeLookup(result: TaxLookupDto, startTime: number): TaxLookupDto {
      const duration = Date.now() - startTime;

      this.logger.log({
          message: `Tax lookup completed`,
          taxId: result.taxId,
          country: result.country,
          isValid: result.isValid,
          latencyMs: duration,
          context: 'TaxLookup'
      });

      return result;
  }
}
