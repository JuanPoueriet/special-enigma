export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock?: number;
  category?: string;
  status?: string;
  imageUrl?: string;
}
