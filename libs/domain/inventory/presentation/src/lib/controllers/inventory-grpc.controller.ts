import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface GetProductRequest {
  id: string;
}

interface Product {
  id: string;
  tenantId: string;
  name: string;
  quantity: number;
}

@Controller()
export class InventoryGrpcController {
  @GrpcMethod('InventoryService', 'GetProduct')
  async getProduct(data: GetProductRequest): Promise<Product> {
    return {
      id: data.id,
      tenantId: 'tenant-1',
      name: 'Sample Product',
      quantity: 10,
    };
  }
}
