import { Injectable, Inject } from '@nestjs/common';
import { ProductionOrder, ProductionOrderRepository, PRODUCTION_ORDER_REPOSITORY, InventoryService, INVENTORY_SERVICE } from '@virteex/manufacturing-domain';

export class CreateProductionOrderDto {
  tenantId!: string;
  warehouseId!: string;
  productSku!: string;
  quantity!: number;
  dueDate!: Date;
}

@Injectable()
export class CreateProductionOrderUseCase {
  constructor(
    @Inject(PRODUCTION_ORDER_REPOSITORY) private readonly repository: ProductionOrderRepository,
    @Inject(INVENTORY_SERVICE) private readonly inventoryService: InventoryService
  ) {}

  async execute(dto: CreateProductionOrderDto): Promise<ProductionOrder> {
    await this.inventoryService.checkAndReserveStock(dto.tenantId, dto.warehouseId, dto.productSku, dto.quantity);

    const order = new ProductionOrder(dto.tenantId, dto.warehouseId, dto.productSku, dto.quantity, new Date(dto.dueDate));
    await this.repository.save(order);
    return order;
  }
}
