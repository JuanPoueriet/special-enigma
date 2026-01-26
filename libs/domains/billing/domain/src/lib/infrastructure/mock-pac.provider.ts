import { PacProvider, FiscalStamp } from './pac-provider.interface';
import { v4 as uuidv4 } from 'uuid';

export class MockPacProvider implements PacProvider {
  async stamp(xml: string): Promise<FiscalStamp> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const uuid = uuidv4();
    const fechaTimbrado = new Date().toISOString();
    const selloSAT = "MOCK_SELLO_SAT_" + Buffer.from(uuid).toString('base64');
    const selloCFD = "MOCK_SELLO_CFD_" + Buffer.from(Date.now().toString()).toString('base64');

    // Simulate injecting the timbre into the XML (very simplified string injection)
    const timbreNode = `
    <tfd:TimbreFiscalDigital
       xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital"
       UUID="${uuid}"
       FechaTimbrado="${fechaTimbrado}"
       SelloSAT="${selloSAT}"
       SelloCFD="${selloCFD}"
       Version="1.1" />`;

    const signedXml = xml.replace('</cfdi:Comprobante>', `${timbreNode}</cfdi:Comprobante>`);

    return {
      uuid,
      selloSAT,
      selloCFD,
      fechaTimbrado,
      xml: signedXml
    };
  }

  async cancel(uuid: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`[MockPac] Cancelled UUID: ${uuid}`);
    return true;
  }
}
