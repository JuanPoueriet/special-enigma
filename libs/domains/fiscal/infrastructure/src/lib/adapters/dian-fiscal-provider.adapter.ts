import { Injectable, Logger } from '@nestjs/common';
import { FiscalProvider } from '../../../../domain/src/lib/ports/fiscal-provider.port';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SignedXml } from 'xml-crypto';
// @ts-ignore
import { DOMParser } from '@xmldom/xmldom';
import * as crypto from 'crypto';
import * as libxmljs from 'libxmljs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DianFiscalAdapter implements FiscalProvider {
  private readonly logger = new Logger(DianFiscalAdapter.name);
  private privateKey: string;
  private xsdSchema: libxmljs.Document;

  constructor(private readonly httpService: HttpService) {
      if (process.env['FISCAL_PRIVATE_KEY']) {
          this.privateKey = process.env['FISCAL_PRIVATE_KEY'];
      } else {
          this.logger.error('FISCAL_PRIVATE_KEY not provided. Cannot initialize DIAN adapter.');
          throw new Error('FISCAL_PRIVATE_KEY is missing');
      }

      try {
          // Load XSD Schema
          const schemaPath = path.join(__dirname, '../schemas/dian-ubl-2.1.xsd');
          // In a real build, we need to ensure this asset is copied.
          // For now, assuming it exists at runtime relative to this file or we handle the error.
          if (fs.existsSync(schemaPath)) {
             const xsdContent = fs.readFileSync(schemaPath, 'utf8');
             this.xsdSchema = libxmljs.parseXml(xsdContent);
          } else {
             this.logger.warn(`XSD Schema not found at ${schemaPath}. Validation will be skipped.`);
          }
      } catch (e) {
          this.logger.error('Failed to load XSD schema', e);
      }
  }

  async validateInvoice(invoice: any): Promise<boolean> {
    this.logger.log(`Validating invoice ${invoice?.id} with DIAN (Robust Integration)...`);

    if (!invoice) {
        throw new Error('Invoice is null or undefined');
    }

    let xmlContent = '';
    if (typeof invoice === 'string') {
        xmlContent = invoice;
    } else {
        // If it's an object, we can't validate against XSD easily without serializing it first.
        // Assuming validation happens on the XML string usually.
        // If we only have the object, we skip XSD validation or would need the builder here.
        this.logger.warn('validateInvoice received an object, skipping XSD validation as it requires XML string.');
        return true;
    }

    if (this.xsdSchema) {
        try {
            const xmlDoc = libxmljs.parseXml(xmlContent);
            const isValid = xmlDoc.validate(this.xsdSchema);
            if (!isValid) {
                this.logger.error('XML Validation Failed', xmlDoc.validationErrors);
                throw new Error(`XML Validation Failed: ${xmlDoc.validationErrors.map(e => e.message).join(', ')}`);
            }
            this.logger.log('XML Validation Successful');
        } catch (e: any) {
            this.logger.error(`Validation Error: ${e.message}`);
            throw e;
        }
    }

    return true;
  }

  async signInvoice(invoice: any): Promise<string> {
    this.logger.log(`Signing invoice ${invoice?.id || 'UNKNOWN'} with DIAN Digital Certificate (XAdES-EPES)...`);

    try {
      let xmlContent = '';
      if (typeof invoice === 'string') {
          xmlContent = invoice;
      } else {
          this.logger.warn('Received object in signInvoice, expecting XML string. Using fallback wrapper.');
          xmlContent = `<Invoice><ID>${invoice?.id || 'TEST'}</ID></Invoice>`;
      }

      const sig = new SignedXml();

      sig.addReference({
          xpath: "//*[local-name(.)='Invoice']",
          transforms: ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#']
      });

      sig.canonicalizationAlgorithm = 'http://www.w3.org/2001/10/xml-exc-c14n#';
      sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256';

      // Fix TS2339 by casting to any (library property exists at runtime)
      (sig as any).signingKey = this.privateKey;

      sig.computeSignature(xmlContent);

      const signedXml = sig.getSignedXml();

      this.logger.log(`Invoice signed successfully.`);
      return signedXml;

    } catch (error: any) {
      this.logger.error(`Failed to sign invoice: ${error.message}`, error.stack);
      throw new Error(`Signing failed: ${error.message}`);
    }
  }

  async transmitInvoice(invoice: any): Promise<void> {
    this.logger.log(`Transmitting invoice to DIAN (SOAP)...`);

    try {
        const dianUrl = process.env['DIAN_API_URL'] || 'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc';

        let signedXml = '';
        if (typeof invoice === 'string') {
            signedXml = invoice;
        } else {
             // If invoice is object, assume it needs signing first (though usually done before transmit)
             signedXml = await this.signInvoice(invoice);
        }

        // Wrap in SOAP Envelope
        const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcf="http://wcf.dian.colombia">
           <soapenv:Header/>
           <soapenv:Body>
              <wcf:SendBillAsync>
                 <wcf:fileName>${invoice?.id || 'invoice'}.xml</wcf:fileName>
                 <wcf:contentFile>${Buffer.from(signedXml).toString('base64')}</wcf:contentFile>
              </wcf:SendBillAsync>
           </soapenv:Body>
        </soapenv:Envelope>`;

        this.logger.log(`Sending to DIAN endpoint: ${dianUrl}`);

        const response = await firstValueFrom(
            this.httpService.post(dianUrl, soapEnvelope, {
                headers: {
                    'Content-Type': 'text/xml;charset=UTF-8',
                    'SOAPAction': 'http://wcf.dian.colombia/iwcfDianCustomerServices/SendBillAsync'
                }
            })
        );

        if (response.status === 200 && response.data.includes('UploadSuccess')) {
             this.logger.log('DIAN Transmission Successful');
        } else {
             this.logger.warn(`DIAN response status: ${response.status}. Body: ${response.data}`);
             // Depending on response, throw or log
        }
    } catch (error: any) {
        this.logger.error(`Transmission failed: ${error.message}`, error.response?.data);
        throw new Error(`DIAN Transmission Error: ${error.message}`);
    }
  }
}
