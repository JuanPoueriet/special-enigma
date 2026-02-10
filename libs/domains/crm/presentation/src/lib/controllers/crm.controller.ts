import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateSaleUseCase,
  CreateSaleDto,
} from '@virteex/crm-application/lib/use-cases/create-sale.use-case';

@ApiTags('CRM')
@Controller('crm')
export class CrmController {
  constructor(private readonly createSaleUseCase: CreateSaleUseCase) {}

  @Post('sales')
  @ApiOperation({ summary: 'Create a new sale (POS)' })
  async createSale(@Body() dto: CreateSaleDto) {
    return this.createSaleUseCase.execute(dto);
  }
}
