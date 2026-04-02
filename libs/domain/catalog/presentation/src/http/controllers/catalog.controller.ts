import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GetProductsUseCase, GetProductByIdUseCase, CreateProductUseCase, type CreateProductDto, UpdateProductUseCase, type UpdateProductDto, DeleteProductUseCase, GetSatCatalogsUseCase, GetProductBySkuUseCase } from '@virtex/domain-catalog-application';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';

@ApiTags('Catalog')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getSatCatalogsUseCase: GetSatCatalogsUseCase,
    private readonly getProductBySkuUseCase: GetProductBySkuUseCase
  ) {}

  @Get('products')
  @RequireEntitlement('catalog:read')
  @ApiOperation({ summary: 'Get all products' })
  async getProducts(@CurrentTenant() tenantId: string) {
    return this.getProductsUseCase.execute(tenantId);
  }

  @Get('products/sku/:sku')
  @RequireEntitlement('catalog:read')
  @ApiOperation({ summary: 'Get product by SKU' })
  async getProductBySku(@Param('sku') sku: string, @CurrentTenant() tenantId: string) {
    return this.getProductBySkuUseCase.execute(sku, tenantId);
  }

  @Get('products/:id')
  @RequireEntitlement('catalog:read')
  @ApiOperation({ summary: 'Get product by ID' })
  async getProductById(@Param('id') id: number, @CurrentTenant() tenantId: string) {
    return this.getProductByIdUseCase.execute(id, tenantId);
  }

  @Post('products')
  @RequireEntitlement('catalog:write')
  @ApiOperation({ summary: 'Create a product' })
  async createProduct(@Body() dto: CreateProductDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    return this.createProductUseCase.execute(dto);
  }

  @Put('products/:id')
  @RequireEntitlement('catalog:write')
  @ApiOperation({ summary: 'Update a product' })
  async updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto, @CurrentTenant() tenantId: string) {
    dto.id = id;
    dto.tenantId = tenantId;
    return this.updateProductUseCase.execute(dto);
  }

  @Delete('products/:id')
  @RequireEntitlement('catalog:write')
  @ApiOperation({ summary: 'Delete a product' })
  async deleteProduct(@Param('id') id: number, @CurrentTenant() tenantId: string) {
    return this.deleteProductUseCase.execute(id, tenantId);
  }

  @Get('sat/payment-forms')
  @ApiOperation({ summary: 'Get SAT Payment Forms' })
  getPaymentForms() {
    return this.getSatCatalogsUseCase.getPaymentForms();
  }

  @Get('sat/payment-methods')
  @ApiOperation({ summary: 'Get SAT Payment Methods' })
  getPaymentMethods() {
    return this.getSatCatalogsUseCase.getPaymentMethods();
  }

  @Get('sat/cfdi-usages')
  @ApiOperation({ summary: 'Get SAT CFDI Usages' })
  getCfdiUsages() {
    return this.getSatCatalogsUseCase.getCfdiUsages();
  }

  @GrpcMethod('CatalogService', 'GetProduct')
  async getProduct(data: { id: number }, metadata: any) {
    // Note: tenantId handling in gRPC usually comes from metadata/interceptors
    // For this migration, we'll use a default or extract if available
    const tenantId = metadata.get('tenant-id')?.[0] || 'default';
    return this.getProductByIdUseCase.execute(data.id, tenantId);
  }
}
