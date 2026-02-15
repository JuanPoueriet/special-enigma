export interface SaleItem {
  id?: string;
  productId: string;
  productName?: string;
  price: string | number;
  quantity: string | number;
}

export interface CreateSaleDto {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export interface Sale {
  id: string;
  tenantId: string;
  customerName: string;
  total: string;
  status: 'DRAFT' | 'NEGOTIATION' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';
  items: SaleItem[];
  createdAt: string;
}
