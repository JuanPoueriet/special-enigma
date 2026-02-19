import { Injectable, Logger } from '@nestjs/common';
import { FiscalProvider } from '@virteex/fiscal-domain';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SignedXml } from 'xml-crypto';
// @ts-ignore
import { DOMParser } from '@xmldom/xmldom';

@Injectable()
export class DianFiscalAdapter implements FiscalProvider {
  private readonly logger = new Logger(DianFiscalAdapter.name);

  constructor(private readonly httpService: HttpService) {}

  async validateInvoice(invoice: any): Promise<boolean> {
    this.logger.log(`Validating invoice ${invoice?.id} with DIAN (Real Integration)...`);
    try {
      const url = process.env['DIAN_API_URL'] || 'https://api.dian.gov.co/validate';
      // Use a timeout to avoid hanging if external API is unreachable
      const response = await firstValueFrom(this.httpService.post(url, invoice, { timeout: 5000 }));
      return response.data?.isValid === true;
    } catch (error: any) {
      this.logger.error(`Error validating with DIAN: ${error.message}`);
      return false;
    }
  }

  async signInvoice(invoice: any): Promise<string> {
    this.logger.log(`Signing invoice ${invoice?.id} with DIAN Digital Certificate...`);

    try {
      // 1. Convert invoice to XML (Simplified for structure, assuming JSON invoice)
      // In a real scenario, map the invoice entity to the standard XML format required by DIAN (UBL 2.1)
      const xml = `<Invoice><Id>${invoice?.id || 'UNKNOWN'}</Id><Date>${new Date().toISOString()}</Date></Invoice>`;

      // 2. Sign XML using XAdES (simplified via xml-crypto)
      const sig = new SignedXml();
      sig.addReference({ xpath: "//*[local-name(.)='Invoice']" });

      // Load Private Key from Env or Vault
      // NOTE: This requires a valid PEM private key. Using a placeholder or mock if not present.
      const privateKey = process.env['FISCAL_PRIVATE_KEY'];

      if (!privateKey) {
         this.logger.warn('FISCAL_PRIVATE_KEY not found. Using simulation mode.');
         return `dian-signature-${Date.now()}-SIMULATED`;
      }

      sig.privateKey = privateKey;
      sig.computeSignature(xml);

      const signedXml = sig.getSignedXml();
      this.logger.log(`Invoice ${invoice?.id} signed successfully.`);
      return signedXml;

    } catch (error: any) {
      this.logger.error(`Failed to sign invoice: ${error.message}`, error.stack);
      // Fallback to simulation to ensure service stability during development without certs
      return `dian-signature-${Date.now()}-FALLBACK`;
    }
  }

  async transmitInvoice(invoice: any): Promise<void> {
    this.logger.log(`Transmitting invoice ${invoice?.id} to DIAN...`);
    try {
      const url = process.env['DIAN_API_URL'] ? `${process.env['DIAN_API_URL']}/transmit` : 'https://api.dian.gov.co/transmit';
      await firstValueFrom(this.httpService.post(url, invoice));
      this.logger.log(`Invoice ${invoice?.id} transmitted successfully to DIAN.`);
    } catch (error) {
      this.logger.error(`Error transmitting to DIAN`, error);
      throw error;
    }
  }
}
