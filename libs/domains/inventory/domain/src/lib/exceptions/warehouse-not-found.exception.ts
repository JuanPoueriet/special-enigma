export class WarehouseNotFoundException extends Error {
  constructor(warehouseId: string) {
    super(`Warehouse with ID ${warehouseId} not found`);
    this.name = 'WarehouseNotFoundException';
  }
}
