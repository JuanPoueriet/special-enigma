import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('pos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return { status: 'ok', service: 'POS-BFF' };
  }

  @Get('products/:id')
  async getProductDetails(@Param('id') id: string, @Query('warehouseId') warehouseId: string) {
    return this.appService.getProductDetails(Number(id), warehouseId);
  }
}
