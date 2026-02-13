export class InsufficientStockException extends Error {
  constructor(productId: string, warehouseId: string) {
    super(`Insufficient stock for product ${productId} in warehouse ${warehouseId}`);
    this.name = 'InsufficientStockException';
  }
}
