import { TaxLookupDto } from '@virtex/domain-identity-contracts';
import { AbstractRobustTaxProvider } from './abstract-robust-tax-provider';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export class GenericTaxProvider extends AbstractRobustTaxProvider {
  protected readonly logger = new Logger(GenericTaxProvider.name);

  constructor(private readonly countryCode: string, httpService: HttpService) {
    super(httpService);
  }

  getCountryCode(): string {
    return this.countryCode;
  }

  protected getApiUrl(taxId: string): string {
    return `https://api.global-tax-lookup.com/v1/${this.countryCode}/${taxId}`;
  }

  protected mapResponse(data: any, taxId: string): TaxLookupDto {
    if (data && data.isValid) {
      return {
        taxId,
        country: this.countryCode,
        name: data.companyName,
        legalName: data.companyName,
        industry: data.industry,
        status: data.status,
        isValid: true,
      };
    }

    return {
      taxId,
      country: this.countryCode,
      name: '',
      isValid: false,
    };
  }
}
