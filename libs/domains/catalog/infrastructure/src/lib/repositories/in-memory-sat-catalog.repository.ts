import { Injectable } from '@nestjs/common';
import { SatCatalogRepository, SatCatalogItem } from '@virteex/catalog-domain';

@Injectable()
export class InMemorySatCatalogRepository implements SatCatalogRepository {
  async getPaymentForms(): Promise<SatCatalogItem[]> {
    return [
      { code: '01', name: '01 - Efectivo' },
      { code: '03', name: '03 - Transferencia electrónica de fondos' },
      { code: '04', name: '04 - Tarjeta de crédito' },
      { code: '99', name: '99 - Por definir' }
    ];
  }

  async getPaymentMethods(): Promise<SatCatalogItem[]> {
    return [
      { code: 'PUE', name: 'Pago en una sola exhibición' },
      { code: 'PPD', name: 'Pago en parcialidades o diferido' }
    ];
  }

  async getCfdiUsages(): Promise<SatCatalogItem[]> {
    return [
      { code: 'G01', name: 'Adquisición de mercancías' },
      { code: 'G03', name: 'Gastos en general' },
      { code: 'P01', name: 'Por definir' }
    ];
  }
}
