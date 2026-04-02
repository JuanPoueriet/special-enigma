import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, Observable } from 'rxjs';
import { INVENTORY_PACKAGE, INVENTORY_PROTO_PATH } from '@virtex/shared-proto';
import { InventoryService } from '@virtex/domain-manufacturing-domain';

interface InventoryGrpcService {
  checkAndReserveStock(data: {
    tenantId: string;
    warehouseId: string;
    productSku: string;
    quantity: number;
  }): Observable<{ success: boolean; message: string }>;
}

@Injectable()
export class GrpcInventoryAdapter implements InventoryService, OnModuleInit {
  private readonly logger = new Logger(GrpcInventoryAdapter.name);
  private inventoryGrpcService: InventoryGrpcService | null = null;
  private client: ClientGrpc;

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: INVENTORY_PACKAGE,
        protoPath: INVENTORY_PROTO_PATH,
        url: this.configService.get<string>(
          'INVENTORY_GRPC_URL',
          'virtex-inventory-service:50053'
        ),
      },
    }) as any;
  }

  onModuleInit() {
    this.inventoryGrpcService =
      this.client.getService<InventoryGrpcService>('InventoryService');
  }

  async checkAndReserveStock(
    tenantId: string,
    warehouseId: string,
    productSku: string,
    quantity: number
  ): Promise<void> {
    try {
      if (!this.inventoryGrpcService) {
        throw new Error('Inventory gRPC service not initialized');
      }

      const response = await firstValueFrom(
        this.inventoryGrpcService.checkAndReserveStock({
          tenantId,
          warehouseId,
          productSku,
          quantity,
        })
      );

      if (!response.success) {
        throw new Error(response.message);
      }
    } catch (error: any) {
      this.logger.error(
        `Failed to reserve stock via gRPC for ${productSku}: ${error.message}`
      );
      throw new Error(`Failed to reserve stock: ${error.message}`);
    }
  }
}
