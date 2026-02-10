import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetProductsUseCase } from '@virteex/catalog-application/lib/use-cases/get-products.use-case';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  @Get('products')
  @ApiOperation({ summary: 'Get all products' })
  async getProducts(@Query('tenantId') tenantId: string = 'default') {
    return this.getProductsUseCase.execute(tenantId);
  }
}
