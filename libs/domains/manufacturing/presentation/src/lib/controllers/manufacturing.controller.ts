import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProductionOrderUseCase, CreateProductionOrderDto } from '@virteex/manufacturing-application';

@ApiTags('Manufacturing')
@Controller('manufacturing')
export class ManufacturingController {
  constructor(
    private readonly createUseCase: CreateProductionOrderUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'Manufacturing' };
  }

  @Post('orders')
  @ApiOperation({ summary: 'Create Production Order' })
  create(@Body() dto: CreateProductionOrderDto) {
    return this.createUseCase.execute(dto);
  }
}
