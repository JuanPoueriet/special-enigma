export const SALES_PORT = 'SALES_PORT';

export interface TopProductDto {
  productId: string;
  name: string;
  quantity: number;
  totalSales: number;
}

export interface SalesPort {
  getTopProducts(tenantId: string, limit: number): Promise<TopProductDto[]>;
}
