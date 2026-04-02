import { TaxLookupDto } from '@virtex/domain-identity-contracts';
import { AbstractRobustTaxProvider } from './abstract-robust-tax-provider';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export class MexicoTaxProvider extends AbstractRobustTaxProvider {
  protected readonly logger = new Logger(MexicoTaxProvider.name);

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getCountryCode(): string {
    return 'MX';
  }

  protected getApiUrl(taxId: string): string {
    return `https://api.sat.gob.mx/v1/rfc/${taxId}`;
  }

  protected mapResponse(data: any, taxId: string): TaxLookupDto {
    if (data && data.success && data.rfcInfo) {
      return {
        taxId,
        country: 'MX',
        name: data.rfcInfo.legalName,
        legalName: data.rfcInfo.legalName,
        industry: data.rfcInfo.industry,
        status: data.rfcInfo.status,
        isValid: data.rfcInfo.status === 'ACTIVO',
      };
    }

    return {
      taxId,
      country: 'MX',
      name: '',
      isValid: false,
    };
  }
}
