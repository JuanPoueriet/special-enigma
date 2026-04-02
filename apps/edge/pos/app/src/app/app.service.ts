import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, Observable, catchError, of, forkJoin } from 'rxjs';
import {
  CATALOG_PACKAGE,
  CATALOG_PROTO_PATH,
  INVENTORY_PACKAGE,
  INVENTORY_PROTO_PATH,
} from '@virtex/shared-proto';

interface CatalogService {
  getProductById(data: { id: number; tenantId: string }): Observable<any>;
}

interface InventoryService {
  getProduct(data: { id: string }): Observable<any>;
}

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  private catalogClient: ClientGrpc;
  private inventoryClient: ClientGrpc;

  private catalogService: CatalogService | null = null;
  private inventoryService: InventoryService | null = null;

  constructor(private readonly configService: ConfigService) {
    this.catalogClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: CATALOG_PACKAGE,
        protoPath: CATALOG_PROTO_PATH,
        url: this.configService.get('CATALOG_GRPC_URL', 'virtex-catalog-service:50054'),
      },
    }) as any;

    this.inventoryClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: INVENTORY_PACKAGE,
        protoPath: INVENTORY_PROTO_PATH,
        url: this.configService.get('INVENTORY_GRPC_URL', 'virtex-inventory-service:50053'),
      },
    }) as any;
  }

  onModuleInit() {
    this.catalogService = this.catalogClient.getService<CatalogService>('CatalogService');
    this.inventoryService = this.inventoryClient.getService<InventoryService>('InventoryService');
  }

  async getProductDetails(id: number, warehouseId: string): Promise<any> {
    if (!this.catalogService || !this.inventoryService) {
      throw new Error('BFF Services not fully initialized');
    }

    try {
      // Aggregate data from Catalog and Inventory
      const details$ = forkJoin({
        product: this.catalogService.getProductById({ id, tenantId: 'system' }).pipe(
            catchError(err => {
                this.logger.error(`Error fetching product from Catalog: ${err.message}`);
                return of(null);
            })
        ),
        inventory: this.inventoryService.getProduct({ id: id.toString() }).pipe(
            catchError(err => {
                this.logger.error(`Error fetching inventory for product: ${err.message}`);
                return of(null);
            })
        )
      });

      const result = await firstValueFrom(details$);

      if (!result.product) {
          throw new Error('Product not found in catalog');
      }

      return {
        ...result.product,
        stock: result.inventory ? result.inventory.quantity : 0,
        warehouseId,
        aggregatedAt: new Date().toISOString()
      };
    } catch (error: any) {
      this.logger.error(`BFF Aggregation failed for product ${id}: ${error.message}`);
      throw error;
    }
  }
}
