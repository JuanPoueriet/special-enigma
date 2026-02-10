import { Inject, Injectable } from '@nestjs/common';
import {
  Warehouse,
  WAREHOUSE_REPOSITORY,
  WarehouseRepository,
} from '@virteex/inventory-domain';
import { WarehouseDto } from '@virteex/inventory-contracts';

@Injectable()
export class GetWarehousesUseCase {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private warehouseRepository: WarehouseRepository,
  ) {}

  async execute(tenantId: string): Promise<WarehouseDto[]> {
    const warehouses = await this.warehouseRepository.findAll(tenantId);
    // Simple mapping assuming DTO matches entity or close enough for now.
    // Ideally use a mapper like WarehouseMapper.toDto(w)
    // But since I don't want to create mapper if it doesn't exist, I'll map manually here.
    return warehouses.map((w) => ({
      id: w.id,
      name: w.name,
      location: w.location,
      tenantId: w.tenantId,
    }));
  }
}
