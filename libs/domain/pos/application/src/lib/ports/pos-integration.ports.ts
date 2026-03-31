export interface PosInventoryPort {
  reserveStock(tenantId: string, items: any[], reference: string): Promise<void>;
}

export const POS_INVENTORY_PORT = Symbol('POS_INVENTORY_PORT');

export interface PosBillingPort {
  createInvoice(params: any): Promise<void>;
}

export const POS_BILLING_PORT = Symbol('POS_BILLING_PORT');
