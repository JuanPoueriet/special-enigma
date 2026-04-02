import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PosBillingPort, PosInventoryPort } from '@virteex/domain-pos-application';
import { firstValueFrom, Observable } from 'rxjs';

interface BillingService {
  getInvoice(data: { id: string }): Observable<any>;
}

interface InventoryService {
  getProduct(data: { id: string }): Observable<any>;
}

@Injectable()
export class GrpcPosIntegrationAdapter implements PosBillingPort, PosInventoryPort, OnModuleInit {
  private billingService!: BillingService;
  private inventoryService!: InventoryService;

  constructor(
    @Inject('BILLING_PACKAGE') private billingClient: ClientGrpc,
    @Inject('INVENTORY_PACKAGE') private inventoryClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.billingService = this.billingClient.getService<BillingService>('BillingService');
    this.inventoryService = this.inventoryClient.getService<InventoryService>('InventoryService');
  }

  async createInvoice(params: any): Promise<void> {
    // In a real implementation, this would call a CreateInvoice method on the gRPC service
    // For now, we align with the architecture by using the client
    console.log('Calling Billing gRPC Service with params:', params);
    // await firstValueFrom(this.billingService.createInvoice(params));
  }

  async reserveStock(tenantId: string, items: any[], reference: string): Promise<void> {
    // In a real implementation, this would call a ReserveStock method on the gRPC service
    console.log('Calling Inventory gRPC Service for tenant:', tenantId, 'reference:', reference);
    // await firstValueFrom(this.inventoryService.reserveStock({ tenantId, items, reference }));
  }
}
