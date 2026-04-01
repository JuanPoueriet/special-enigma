import { Injectable, Inject } from '@nestjs/common';
import { type WarehouseRepository, WAREHOUSE_REPOSITORY, WarehouseNotFoundError } from '@virteex/domain-inventory-domain';

@Injectable()
export class DeleteWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly warehouseRepository: WarehouseRepository
  ) {}

  async execute(id: string, tenantId: string): Promise<void> {
    const warehouse = await this.warehouseRepository.findById(id, tenantId);
    if (!warehouse) {
      throw new WarehouseNotFoundError(id);
    }
    await this.warehouseRepository.delete(id, tenantId);
  }
}
