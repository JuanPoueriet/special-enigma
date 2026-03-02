import { Injectable, Logger, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timer, throwError } from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';
import { FiscalProvider } from '@virteex/domain-fiscal-domain';

@Injectable()
export class UsTaxPartnerFiscalAdapter implements FiscalProvider {
  private readonly logger = new Logger(UsTaxPartnerFiscalAdapter.name);
  private readonly partnerUrl: string;
  private readonly partnerApiKey: string;
  private readonly nodeEnv: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.partnerUrl = this.configService.get<string>('US_TAX_PARTNER_URL', '').trim();
    this.partnerApiKey = this.configService.get<string>('US_TAX_PARTNER_API_KEY', '').trim();
    this.nodeEnv = (this.configService.get<string>('NODE_ENV') ?? 'development').toLowerCase();

    const isProduction = this.nodeEnv === 'production' || process.env['RELEASE_STAGE'] === 'production';

    if (isProduction && (!this.partnerUrl || !this.partnerApiKey || this.partnerUrl.includes('mock') || this.partnerApiKey.includes('test'))) {
      this.logger.error('FATAL: US Tax Partner is NOT properly configured for production.');
      throw new Error('US fiscal partner is required in production with REAL credentials. Configure US_TAX_PARTNER_URL and US_TAX_PARTNER_API_KEY.');
    }
  }

  async validateInvoice(invoice: unknown): Promise<boolean> {
    const endpoint = this.configService.get<string>('US_TAX_PARTNER_VALIDATE_PATH', '/v1/validate');
    try {
      const response = await this.callPartner(endpoint, invoice);
      return response?.valid === true;
    } catch (error) {
      this.logger.error(`Validation failed for invoice: ${error.message}`);
      return false; // Fail safe for validation
    }
  }

  async signInvoice(invoice: unknown): Promise<string> {
    const endpoint = this.configService.get<string>('US_TAX_PARTNER_SIGN_PATH', '/v1/sign');
    const response = await this.callPartner(endpoint, invoice);
    if (!response?.signature) {
      this.logger.error('US tax partner returned no signature in successful response.');
      throw new InternalServerErrorException('US tax partner returned no signature.');
    }
    return String(response.signature);
  }

  async transmitInvoice(invoice: unknown): Promise<void> {
    const endpoint = this.configService.get<string>('US_TAX_PARTNER_TRANSMIT_PATH', '/v1/transmit');
    await this.callPartner(endpoint, invoice);
  }

  private async callPartner(endpoint: string, payload: unknown): Promise<any> {
    if (!this.partnerUrl || !this.partnerApiKey) {
      this.logger.error(`CRITICAL: US tax partner integration is not configured! Endpoint: ${endpoint}`);
      throw new ServiceUnavailableException('US tax partner integration is missing. US fiscal operations are blocked.');
    }

    const fullUrl = `${this.partnerUrl.replace(/\/$/, '')}${endpoint}`;

    try {
      this.logger.log(`Calling US tax partner endpoint: ${endpoint}`);
      const response = await firstValueFrom(
        this.httpService.post(fullUrl, payload, {
          headers: {
            Authorization: `Bearer ${this.partnerApiKey}`,
            'Content-Type': 'application/json',
            'X-Virteex-Region': 'US',
            'X-Virteex-Trace-Id': crypto.randomUUID(),
          }
        }).pipe(
          timeout(8000), // 8s timeout
          retry({
            count: 2,
            delay: (error, retryCount) => {
              this.logger.warn(`Retrying US tax partner call (${retryCount}/2) due to: ${error.message}`);
              return timer(retryCount * 1000);
            },
            resetOnSuccess: true
          }),
          catchError(err => {
            this.logger.error(`Request to ${fullUrl} failed: ${err.message}`);
            return throwError(() => err);
          })
        )
      );

      return response.data;
    } catch (error: any) {
      this.logger.error(`Partner communication error at ${endpoint}: ${error.message}`);
      if (error.response) {
        this.logger.error(`Partner status: ${error.response.status} - Data: ${JSON.stringify(error.response.data)}`);
      }

      if (error.code === 'ECONNABORTED' || error.name === 'TimeoutError') {
         throw new ServiceUnavailableException('US tax partner timed out. Please try again later.');
      }

      throw new InternalServerErrorException(`US tax partner communication failed: ${error.message}`);
    }
  }
}
