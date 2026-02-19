import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import {
  ProductionOrder,
  ProductionOrderRepository,
  PRODUCTION_ORDER_REPOSITORY,
  InventoryService,
  INVENTORY_SERVICE,
  BillOfMaterialsRepository,
  BILL_OF_MATERIALS_REPOSITORY
} from '@virteex/manufacturing-domain';
import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateProductionOrderDto {
  @IsString()
  tenantId!: string;

  @IsString()
  warehouseId!: string;

  @IsString()
  productSku!: string;

  @IsNumber()
  quantity!: number;

  @IsDateString()
  dueDate!: Date;
}

@Injectable()
export class CreateProductionOrderUseCase {
  private readonly logger = new Logger(CreateProductionOrderUseCase.name);

  constructor(
    @Inject(PRODUCTION_ORDER_REPOSITORY) private readonly repository: ProductionOrderRepository,
    @Inject(INVENTORY_SERVICE) private readonly inventoryService: InventoryService,
    @Inject(BILL_OF_MATERIALS_REPOSITORY) private readonly bomRepository: BillOfMaterialsRepository
  ) {}

  async execute(dto: CreateProductionOrderDto): Promise<ProductionOrder> {
    // 1. Validate BOM Existence (Robustness)
    const bom = await this.bomRepository.findByProductSku(dto.productSku);
    if (!bom) {
      throw new NotFoundException(`No active Bill of Materials (BOM) found for product SKU: ${dto.productSku}`);
    }

    // 2. Reserve Raw Materials (Components)
    // We iterate through the BOM components and reserve stock for each one based on the order quantity.
    // Example: If order quantity is 10, and BOM component quantity is 2, we reserve 20.
    if (bom.components && bom.components.length > 0) {
      for (const component of bom.components) {
        const requiredQuantity = Number(component.quantity) * dto.quantity;
        this.logger.debug(`Reserving component: ${component.componentProductSku}, Qty: ${requiredQuantity}`);

        await this.inventoryService.checkAndReserveStock(
          dto.tenantId,
          dto.warehouseId,
          component.componentProductSku,
          requiredQuantity
        );
      }
    } else {
      this.logger.warn(`BOM for SKU ${dto.productSku} has no components defined. Skipping material reservation.`);
    }

    // 3. Create Production Order (for the finished good)
    const order = new ProductionOrder(dto.tenantId, dto.warehouseId, dto.productSku, dto.quantity, new Date(dto.dueDate));

    await this.repository.save(order);
    return order;
  }
}
