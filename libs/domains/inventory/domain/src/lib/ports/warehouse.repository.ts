import { Warehouse } from '@virteex/inventory-domain/lib/entities/warehouse.entity';
import { Location } from '@virteex/inventory-domain/lib/entities/location.entity';

export interface WarehouseRepository {
  save(warehouse: Warehouse): Promise<void>;
  findById(id: string): Promise<Warehouse | null>;
  findByCode(code: string, tenantId: string): Promise<Warehouse | null>;
  saveLocation(location: Location): Promise<void>;
  findLocationById(id: string): Promise<Location | null>;
}

export const WAREHOUSE_REPOSITORY = 'WAREHOUSE_REPOSITORY';
