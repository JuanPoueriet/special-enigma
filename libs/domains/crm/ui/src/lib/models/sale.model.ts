export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  tenantId: string;
  customerId: string;
  items: SaleItem[];
  totalAmount: number;
  status: 'draft' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface CreateSaleDto {
  customerId: string;
  items: SaleItem[];
}
