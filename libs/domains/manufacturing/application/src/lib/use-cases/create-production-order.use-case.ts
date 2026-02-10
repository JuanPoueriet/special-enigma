import { Injectable, Inject } from '@nestjs/common';
import { ProductionOrder, ProductionOrderRepository, PRODUCTION_ORDER_REPOSITORY } from '@virteex/manufacturing-domain';

export class CreateProductionOrderDto {
  tenantId!: string;
  productSku!: string;
  quantity!: number;
  dueDate!: Date;
}

@Injectable()
export class CreateProductionOrderUseCase {
  constructor(
    @Inject(PRODUCTION_ORDER_REPOSITORY) private readonly repository: ProductionOrderRepository
  ) {}

  async execute(dto: CreateProductionOrderDto): Promise<ProductionOrder> {
    const order = new ProductionOrder(dto.tenantId, dto.productSku, dto.quantity, new Date(dto.dueDate));
    await this.repository.save(order);
    return order;
  }
}
