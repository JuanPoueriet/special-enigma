export class Product {
  id!: number;
  tenantId!: string;
  sku!: string;
  name!: string;
  price!: string;
  fiscalCode?: string;
  taxGroup?: string;
  isActive = true;

  constructor(sku: string, name: string, price: string) {
    this.sku = sku;
    this.name = name;
    this.changePrice(price);
  }

  changePrice(newPrice: string): void {
    const priceNum = parseFloat(newPrice);
    if (priceNum < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
  }
}
