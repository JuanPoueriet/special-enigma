import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSaleUseCase, CreateSaleDto, ListSalesUseCase } from '../../../../application/src';

@ApiTags('CRM')
@Controller('crm')
export class CrmController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly listSalesUseCase: ListSalesUseCase
  ) {}

  @Post('sales')
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'The sale has been successfully created.' })
  async createSale(@Body() dto: CreateSaleDto) {
    return this.createSaleUseCase.execute(dto);
  }

  @Get('sales')
  @ApiOperation({ summary: 'List sales' })
  @ApiResponse({ status: 200, description: 'List of sales.' })
  async listSales(@Query('tenantId') tenantId: string) {
    return this.listSalesUseCase.execute(tenantId || 'default');
  }
}
