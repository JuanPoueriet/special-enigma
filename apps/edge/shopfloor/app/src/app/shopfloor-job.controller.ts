import { Controller, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface InventoryService {
  getProduct(data: { id: string }): Observable<any>;
}

@Controller('shopfloor/jobs')
export class ShopfloorJobController implements OnModuleInit {
  private inventoryService: InventoryService;

  constructor(@Inject('INVENTORY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.inventoryService = this.client.getService<InventoryService>('InventoryService');
  }

  @Get(':id/status')
  getJobStatus(@Param('id') id: string) {
    // In a real scenario, this might check production orders, but here we proxy to inventory for status
    return this.inventoryService.getProduct({ id });
  }
}
