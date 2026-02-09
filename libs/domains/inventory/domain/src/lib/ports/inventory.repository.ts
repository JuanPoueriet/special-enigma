import { InventoryMovement } from '@virteex/inventory-domain/lib/entities/inventory-movement.entity';
import { Stock } from '@virteex/inventory-domain/lib/entities/stock.entity';

export interface InventoryRepository {
  saveMovement(movement: InventoryMovement): Promise<void>;
  findStock(warehouseId: string, productId: string, locationId?: string): Promise<Stock | null>;
  saveStock(stock: Stock): Promise<void>;
}

export const INVENTORY_REPOSITORY = 'INVENTORY_REPOSITORY';
