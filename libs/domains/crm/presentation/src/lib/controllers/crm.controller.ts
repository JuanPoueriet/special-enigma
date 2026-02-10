import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSaleUseCase, CreateSaleDto } from '@virteex/crm-application';

@ApiTags('CRM')
@Controller('crm')
export class CrmController {
  constructor(private readonly createSaleUseCase: CreateSaleUseCase) {}

  @Post('sales')
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'The sale has been successfully created.' })
  async createSale(@Body() dto: CreateSaleDto) {
    return this.createSaleUseCase.execute(dto);
  }
}
