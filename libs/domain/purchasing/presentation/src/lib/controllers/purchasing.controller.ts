import { Controller, Post, Body, Get, Put, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateSupplierUseCase, CreatePurchaseOrderUseCase,
  CreateRequisitionUseCase, GetRequisitionsUseCase,
  CreateVendorBillUseCase, UpdateVendorBillUseCase, GetVendorBillUseCase
} from '@virteex/domain-purchasing-application';
import {
  CreateSupplierDto, CreatePurchaseOrderDto,
  CreateRequisitionDto, CreateVendorBillDto, UpdateVendorBillDto
} from '@virteex/domain-purchasing-contracts';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virteex/kernel-entitlements';

@ApiTags('Purchasing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('purchasing')
export class PurchasingController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly createPurchaseOrderUseCase: CreatePurchaseOrderUseCase,
    private readonly createRequisitionUseCase: CreateRequisitionUseCase,
    private readonly getRequisitionsUseCase: GetRequisitionsUseCase,
    private readonly createVendorBillUseCase: CreateVendorBillUseCase,
    private readonly updateVendorBillUseCase: UpdateVendorBillUseCase,
    private readonly getVendorBillUseCase: GetVendorBillUseCase
  ) {}

  @Post('suppliers')
  @RequireEntitlement('purchasing:suppliers:write')
  async createSupplier(@Body() dto: CreateSupplierDto, @CurrentTenant() tenantId: string) {
    return this.createSupplierUseCase.execute(dto, tenantId);
  }

  @Post('orders')
  @RequireEntitlement('purchasing:orders:write')
  async createPurchaseOrder(@Body() dto: CreatePurchaseOrderDto, @CurrentTenant() tenantId: string) {
    return this.createPurchaseOrderUseCase.execute(dto, tenantId);
  }

  @Post('requisitions')
  @RequireEntitlement('purchasing:requisitions:write')
  async createRequisition(@Body() dto: CreateRequisitionDto, @CurrentTenant() tenantId: string) {
    return this.createRequisitionUseCase.execute(dto, tenantId);
  }

  @Get('requisitions')
  @RequireEntitlement('purchasing:requisitions:read')
  async getRequisitions(@CurrentTenant() tenantId: string) {
    return this.getRequisitionsUseCase.execute(tenantId);
  }

  @Post('bills')
  @RequireEntitlement('purchasing:bills:write')
  async createVendorBill(@Body() dto: CreateVendorBillDto, @CurrentTenant() tenantId: string) {
    return this.createVendorBillUseCase.execute(dto, tenantId);
  }

  @Put('bills/:id')
  @RequireEntitlement('purchasing:bills:write')
  async updateVendorBill(@Param('id') id: string, @Body() dto: UpdateVendorBillDto, @CurrentTenant() tenantId: string) {
    return this.updateVendorBillUseCase.execute(id, dto, tenantId);
  }

  @Get('bills/:id')
  @RequireEntitlement('purchasing:bills:read')
  async getVendorBill(@Param('id') id: string, @CurrentTenant() tenantId: string) {
    return this.getVendorBillUseCase.execute(id, tenantId);
  }
}
