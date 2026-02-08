import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { CreateSupplierUseCase, CreatePurchaseOrderUseCase } from '@virteex/purchasing-application';
import { CreateSupplierDto, CreatePurchaseOrderDto } from '@virteex/purchasing-contracts';
import { getTenantContext } from '@virteex/auth';

@Controller('purchasing')
export class PurchasingController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly createPurchaseOrderUseCase: CreatePurchaseOrderUseCase
  ) {}

  @Post('suppliers')
  async createSupplier(@Body() dto: CreateSupplierDto) {
    const context = getTenantContext();
    if (!context?.tenantId) {
        throw new UnauthorizedException('Tenant context is missing');
    }
    return this.createSupplierUseCase.execute(dto, context.tenantId);
  }

  @Post('orders')
  async createPurchaseOrder(@Body() dto: CreatePurchaseOrderDto) {
    const context = getTenantContext();
    if (!context?.tenantId) {
        throw new UnauthorizedException('Tenant context is missing');
    }
    return this.createPurchaseOrderUseCase.execute(dto, context.tenantId);
  }
}
