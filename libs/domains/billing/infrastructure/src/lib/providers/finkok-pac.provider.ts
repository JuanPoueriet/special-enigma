import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { PacProvider, FiscalStamp } from '@virteex/billing-domain';

export class FinkokPacProvider implements PacProvider {
  private readonly username: string;
  private readonly password: string;
  private readonly url: string;
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    removeNSPrefix: true
  });

  constructor() {
    this.username = process.env['FINKOK_USERNAME'] || 'mock_user';
    this.password = process.env['FINKOK_PASSWORD'] || 'mock_pass';
    this.url = process.env['FINKOK_URL'] || 'https://demo-facturacion.finkok.com/servicios/soap/stamp';
  }

  async stamp(xml: string): Promise<FiscalStamp> {
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:apps="http://facturacion.finkok.com/stamp">
         <soapenv:Header/>
         <soapenv:Body>
            <apps:stamp>
               <apps:xml>${Buffer.from(xml).toString('base64')}</apps:xml>
               <apps:username>${this.username}</apps:username>
               <apps:password>${this.password}</apps:password>
            </apps:stamp>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    let lastError: any;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await axios.post(this.url, soapEnvelope, {
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'stamp'
          }
        });

        const responseBody = response.data;
        const parsed = this.parser.parse(responseBody);

        // Navigate SOAP structure (Envelope -> Body -> stampResponse -> stampResult)
        // Structure depends on library config (removeNSPrefix handles namespaces)
        const body = parsed?.Envelope?.Body;
        const result = body?.stampResponse?.stampResult;
        const fault = body?.Fault;

        if (fault) {
           const faultString = fault.faultstring;
           throw new Error(`Finkok Error: ${faultString}`);
        }

        if (result) {
           const xmlResult = result.xml;
           const uuid = result.UUID;
           const selloSAT = result.SatSeal;
           const selloCFD = result.codestatus || ''; // Attempt to find real seal if available, or empty.
           const fechaTimbrado = result.Date;

           if (!xmlResult || !uuid) {
               throw new Error('Invalid response structure from Finkok');
           }

           return {
               uuid,
               selloSAT: selloSAT || '',
               selloCFD: selloCFD,
               fechaTimbrado: fechaTimbrado || new Date().toISOString(),
               xml: xmlResult
           };
        } else {
           throw new Error('Unknown response format from Finkok');
        }

      } catch (error: any) {
        console.error(`Finkok stamp attempt ${attempt} failed: ${error.message}`);
        lastError = error;
        if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        }
      }
    }

    if (axios.isAxiosError(lastError)) {
      throw new Error(`PAC Connection Error after 3 attempts: ${lastError.message}`);
    }
    throw lastError;
  }

  async cancel(uuid: string): Promise<boolean> {
     const taxId = process.env['TAX_ID'];
     if (!taxId) {
         throw new Error('TAX_ID environment variable missing for cancellation');
     }

     const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:apps="http://facturacion.finkok.com/cancel">
         <soapenv:Header/>
         <soapenv:Body>
            <apps:cancel>
               <apps:UUIDS>
                  <apps:uuids>
                     <apps:string>${uuid}</apps:string>
                  </apps:uuids>
               </apps:UUIDS>
               <apps:username>${this.username}</apps:username>
               <apps:password>${this.password}</apps:password>
               <apps:taxpayer_id>${taxId}</apps:taxpayer_id>
            </apps:cancel>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
        const response = await axios.post(this.url.replace('stamp', 'cancel'), soapEnvelope, {
            headers: { 'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'cancel' }
        });

        const parsed = this.parser.parse(response.data);
        const body = parsed?.Envelope?.Body;
        const fault = body?.Fault;

        if (fault) {
           throw new Error(`Finkok Cancel Error: ${fault.faultstring}`);
        }

        const cancelResult = body?.cancelResponse?.cancelResult;
        if (!cancelResult) {
            throw new Error('Invalid cancel response from Finkok');
        }

        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`PAC Connection Error during cancel: ${error.message}`);
        }
        throw error;
    }
  }
}
