import { LocalizationConfigDto, TaxLookupDto, FiscalRegionDto } from '@virtex/domain-identity-contracts';

export abstract class LocalizationPort {
  abstract getConfig(code: string): Promise<LocalizationConfigDto>;
  abstract lookup(taxId: string, country: string): Promise<TaxLookupDto>;
}

export const LOCALIZATION_PORT = 'LOCALIZATION_PORT';
