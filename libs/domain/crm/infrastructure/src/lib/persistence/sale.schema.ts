import { EntitySchema } from '@mikro-orm/core';
import { Sale, SaleItem, SaleStatus } from '@virteex/domain-crm-domain';

export const SaleSchema = new EntitySchema<Sale>({
  class: Sale,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string' },
    customerId: { type: 'string' },
    customerName: { type: 'string' },
    total: { type: 'decimal', precision: 10, scale: 2 },
    status: { enum: true, items: () => SaleStatus, default: SaleStatus.DRAFT },
    items: {
      reference: '1:m',
      entity: 'SaleItem',
      mappedBy: 'sale',
    },
    createdAt: { type: 'date' },
  },
});

export const SaleItemSchema = new EntitySchema<SaleItem>({
  class: SaleItem,
  properties: {
    id: { primary: true, type: 'uuid' },
    productId: { type: 'string' },
    productName: { type: 'string' },
    price: { type: 'decimal', precision: 10, scale: 2 },
    quantity: { type: 'decimal', precision: 10, scale: 2 },
    sale: {
      reference: 'm:1',
      entity: 'Sale',
    },
  },
});
