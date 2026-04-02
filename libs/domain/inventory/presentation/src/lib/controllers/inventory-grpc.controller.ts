import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ReserveStockUseCase } from '@virtex/domain-inventory-application';

interface GetProductRequest {
  id: string;
}

interface Product {
  id: string;
  tenantId: string;
  name: string;
  quantity: number;
}

interface CheckAndReserveStockRequest {
  tenantId: string;
  warehouseId: string;
  productSku: string;
  quantity: number;
}

interface CheckAndReserveStockResponse {
  success: boolean;
  message: string;
}

@Controller()
export class InventoryGrpcController {
  constructor(private readonly reserveStockUseCase: ReserveStockUseCase) {}

  @GrpcMethod('InventoryService', 'GetProduct')
  async getProduct(data: GetProductRequest): Promise<Product> {
    return {
      id: data.id,
      tenantId: 'tenant-1',
      name: 'Sample Product',
      quantity: 10,
    };
  }

  @GrpcMethod('InventoryService', 'CheckAndReserveStock')
  async checkAndReserveStock(data: CheckAndReserveStockRequest): Promise<CheckAndReserveStockResponse> {
    try {
      await this.reserveStockUseCase.execute(
        data.tenantId,
        data.warehouseId,
        data.productSku,
        data.quantity
      );
      return { success: true, message: 'Stock reserved successfully' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}
