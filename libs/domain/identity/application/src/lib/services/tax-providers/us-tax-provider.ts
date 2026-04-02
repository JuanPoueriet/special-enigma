import { TaxLookupDto } from '@virtex/domain-identity-contracts';
import { AbstractRobustTaxProvider } from './abstract-robust-tax-provider';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export class USTaxProvider extends AbstractRobustTaxProvider {
  protected readonly logger = new Logger(USTaxProvider.name);

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getCountryCode(): string {
    return 'US';
  }

  protected getApiUrl(taxId: string): string {
    return `https://api.ein-lookup.com/v1/ein/${taxId}`;
  }

  protected mapResponse(data: any, taxId: string): TaxLookupDto {
    if (data && data.isValid) {
      return {
        taxId,
        country: 'US',
        name: data.companyName,
        legalName: data.companyName,
        industry: data.industry,
        status: data.status,
        isValid: true,
      };
    }

    return {
      taxId,
      country: 'US',
      name: '',
      isValid: false,
    };
  }
}
