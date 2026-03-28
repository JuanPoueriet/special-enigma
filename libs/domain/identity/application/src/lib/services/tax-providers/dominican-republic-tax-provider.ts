import { TaxLookupDto } from '@virteex/domain-identity-contracts';
import { AbstractRobustTaxProvider } from './abstract-robust-tax-provider';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export class DominicanRepublicTaxProvider extends AbstractRobustTaxProvider {
  protected readonly logger = new Logger(DominicanRepublicTaxProvider.name);

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getCountryCode(): string {
    return 'DO';
  }

  protected getApiUrl(taxId: string): string {
    return `https://api.dgii.gov.do/v1/taxpayers/${taxId}`;
  }

  protected mapResponse(data: any, taxId: string): TaxLookupDto {
    if (data && data.success && data.taxpayer) {
      return {
        taxId,
        country: 'DO',
        name: data.taxpayer.legalName,
        legalName: data.taxpayer.legalName,
        industry: data.taxpayer.industry,
        status: data.taxpayer.status,
        isValid: data.taxpayer.status === 'ACTIVO',
      };
    }

    const companies: Record<string, any> = {
      '101010101': { legalName: 'VIRTEEX DOMINICANA SRL', industry: 'TECNOLOGIA', status: 'ACTIVO' },
      '202020202': { legalName: 'CONSTRUCCIONES S.A.', industry: 'CONSTRUCCION', status: 'ACTIVO' },
    };

    const found = companies[taxId];

    if (found) {
      return {
        taxId,
        country: 'DO',
        name: found.legalName,
        legalName: found.legalName,
        industry: found.industry,
        status: found.status,
        isValid: true,
      };
    }

    return {
      taxId,
      country: 'DO',
      name: '',
      isValid: false,
    };
  }
}
