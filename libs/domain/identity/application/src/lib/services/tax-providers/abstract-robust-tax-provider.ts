import { Logger } from '@nestjs/common';
import { TaxLookupDto } from '@virtex/domain-identity-contracts';
import { TaxProviderPort } from '@virtex/domain-identity-domain';
import { firstValueFrom, timeout, retry, catchError, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';

export abstract class AbstractRobustTaxProvider implements TaxProviderPort {
  protected abstract readonly logger: Logger;
  protected readonly TIMEOUT_MS = 5000;
  protected readonly MAX_RETRIES = 2;

  constructor(protected readonly httpService: HttpService) {}

  abstract getCountryCode(): string;
  protected abstract getApiUrl(taxId: string): string;
  protected abstract mapResponse(data: any, taxId: string): TaxLookupDto;

  async lookup(taxId: string): Promise<TaxLookupDto> {
    const country = this.getCountryCode();

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.getApiUrl(taxId)).pipe(
          timeout(this.TIMEOUT_MS),
          retry({
            count: this.MAX_RETRIES,
            delay: (error, retryCount) => {
              this.logger.warn(`Retry ${retryCount} for ${country} lookup: ${taxId} - Error: ${error.message}`);
              return of(null);
            }
          }),
          catchError((error) => {
            this.logger.error(`Error in ${country} tax lookup for ${taxId}: ${error.message}`);
            throw error;
          })
        )
      );

      return this.mapResponse(response.data, taxId);
    } catch (error: any) {
      this.logger.error(`Failed to perform tax lookup for ${country}/${taxId} after retries. Final error: ${error.message}`);
      return {
        taxId,
        country,
        name: '',
        isValid: false,
      };
    }
  }
}
