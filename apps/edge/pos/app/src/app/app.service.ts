import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private catalogService: any;
  private inventoryService: any;

  constructor(
    @Inject('CATALOG_PACKAGE') private catalogClient: ClientGrpc,
    @Inject('INVENTORY_PACKAGE') private inventoryClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.catalogService = this.clientGetCatalog();
    this.inventoryService = this.clientGetInventory();
  }

  private clientGetCatalog() {
    try {
      return this.catalogClient.getService<any>('CatalogService');
    } catch (e) {
      return null;
    }
  }

  private clientGetInventory() {
    try {
      return this.inventoryClient.getService<any>('InventoryService');
    } catch (e) {
      return null;
    }
  }

  async getData() {
    // Example of aggregation
    const productId = 1;
    let product = null;
    try {
      if (this.catalogService) {
        product = await firstValueFrom(this.catalogService.getProduct({ id: productId }));
      }
    } catch (e) {
      // Fallback or log
    }

    return {
      message: 'POS Edge API - Aggregated Data',
      product: product || { id: productId, name: 'Unknown (Service Unavailable)' },
      timestamp: new Date().toISOString()
    };
  }
}
