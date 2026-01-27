import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { PacProvider, FiscalStamp } from '@virteex-erp/billing-domain';

export class FinkokPacProvider implements PacProvider {
  private readonly username = process.env['FINKOK_USERNAME'] || 'usuario_demo';
  private readonly password = process.env['FINKOK_PASSWORD'] || 'password_demo';
  private readonly url = process.env['FINKOK_URL'] || 'https://demo-facturacion.finkok.com/servicios/soap/stamp';
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    removeNSPrefix: true
  });

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
         const selloCFD = result.codestatus; // Mapping for demo
         const fechaTimbrado = result.Date;

         if (!xmlResult || !uuid) {
             throw new Error('Invalid response structure from Finkok');
         }

         return {
             uuid,
             selloSAT: selloSAT || '',
             selloCFD: selloCFD || '',
             fechaTimbrado: fechaTimbrado || new Date().toISOString(),
             xml: xmlResult
         };
      } else {
         throw new Error('Unknown response format from Finkok');
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`PAC Connection Error: ${error.message}`);
      }
      throw error;
    }
  }

  async cancel(uuid: string): Promise<boolean> {
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
               <apps:taxpayer_id>REQUIRED_RFC</apps:taxpayer_id>
            </apps:cancel>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
        await axios.post(this.url.replace('stamp', 'cancel'), soapEnvelope, {
            headers: { 'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'cancel' }
        });
        return true;
    } catch (e) {
        console.error('Cancel failed', e);
        return false;
    }
  }
}
