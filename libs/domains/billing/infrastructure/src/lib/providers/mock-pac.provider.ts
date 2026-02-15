import { Injectable, Logger } from '@nestjs/common';
import { PacProvider, FiscalStamp } from '@virteex/billing-domain';
import { v4 } from 'uuid';

@Injectable()
export class MockPacProvider implements PacProvider {
  private readonly logger = new Logger(MockPacProvider.name);

  async stamp(xml: string): Promise<FiscalStamp> {
    this.logger.log('Simulating PAC Stamping...');
    await new Promise(resolve => setTimeout(resolve, 500));

    const uuid = v4();
    const now = new Date().toISOString();

    // Simulate appending TimbreFiscalDigital
    const stampedXml = xml.replace(
      '</cfdi:Comprobante>',
      `<cfdi:Complemento><tfd:TimbreFiscalDigital UUID="${uuid}" FechaTimbrado="${now}" SelloSAT="MOCK_SELLO_SAT" /></cfdi:Complemento></cfdi:Comprobante>`
    );

    return {
      uuid,
      selloSAT: 'MOCK_SELLO_SAT_' + uuid,
      selloCFD: 'MOCK_SELLO_CFD_' + uuid,
      fechaTimbrado: now,
      xml: stampedXml
    };
  }

  async cancel(uuid: string): Promise<boolean> {
      this.logger.log(`Cancelling UUID ${uuid} on PAC...`);
      return true;
  }
}
