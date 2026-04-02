import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { INVENTORY_PACKAGE, INVENTORY_PROTO_PATH } from '@virtex/shared-proto';
import { InventoryService } from '@virtex/domain-manufacturing-domain';
import { firstValueFrom } from 'rxjs';

interface InventoryGrpcService {
  checkAndReserveStock(data: { tenantId: string; warehouseId: string; productSku: string; quantity: number }): Promise<void>;
}

@Injectable()
export class GrpcInventoryAdapter implements InventoryService, OnModuleInit {
  private readonly logger = new Logger(GrpcInventoryAdapter.name);
  private inventoryGrpcService: InventoryGrpcService;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: INVENTORY_PACKAGE,
      protoPath: INVENTORY_PROTO_PATH,
      url: process.env['INVENTORY_GRPC_URL'] || 'virtex-inventory-service:50053',
    },
  })
  private client: ClientGrpc;

  constructor(
    private readonly configService: ConfigService
  ) {}

  onModuleInit() {
    this.inventoryGrpcService = this.client.getService<InventoryGrpcService>('InventoryService');
  }

  async checkAndReserveStock(tenantId: string, warehouseId: string, productSku: string, quantity: number): Promise<void> {
    try {
      await firstValueFrom((this.inventoryGrpcService as any).checkAndReserveStock({
        tenantId,
        warehouseId,
        productSku,
        quantity
      }));
    } catch (error: any) {
      this.logger.error(`Failed to reserve stock via gRPC: ${error.message}`, error.stack);
      throw new Error(`Failed to reserve stock for ${productSku}: ${error.message}`);
    }
  }
}
