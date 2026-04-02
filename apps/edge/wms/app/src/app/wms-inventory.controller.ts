import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface InventoryService {
  getProduct(data: { id: string }): any;
}

@Controller('wms/inventory')
export class WmsInventoryController implements OnModuleInit {
  private inventoryService: InventoryService;

  constructor(@Inject('INVENTORY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.inventoryService =
      this.client.getService<InventoryService>('InventoryService');
  }

  @Get('status')
  getInventoryStatus() {
    return { status: 'WMS Inventory API Online', mode: 'gRPC' };
  }

  @Get('product/:id')
  async getProduct(@Param('id') id: string) {
    return await firstValueFrom(this.inventoryService.getProduct({ id }));
  }
}
