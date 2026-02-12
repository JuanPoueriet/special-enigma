export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  price: string;
  quantity: string;
}

export interface Sale {
  id: string;
  tenantId: string;
  customerName: string;
  total: string;
  status: string;
  items: SaleItem[];
  createdAt: string;
}
