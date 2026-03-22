import { v4 } from 'uuid';

export class PurchaseOrderItem {
  id: string = v4();
  productId!: string;
  quantity!: number;
  unitPrice!: string;
  purchaseOrder!: any;

  constructor(productId: string, quantity: number, unitPrice: string) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}

export class PurchaseOrder {
  id: string = v4();
  tenantId!: string;
  orderNumber!: string;
  supplierId!: string;
  status!: string;
  totalAmount!: string;
  expectedDate!: Date;
  items: PurchaseOrderItem[] = [];

  constructor(tenantId: string, supplierId: string, expectedDate: Date) {
    this.tenantId = tenantId;
    this.supplierId = supplierId;
    this.expectedDate = expectedDate;
    this.status = 'DRAFT';
    this.totalAmount = '0.00';
    this.orderNumber = `ORD-${this.id.substring(0, 8).toUpperCase()}`;
  }

  addItem(item: PurchaseOrderItem) {
    this.items.push(item);
  }
}
