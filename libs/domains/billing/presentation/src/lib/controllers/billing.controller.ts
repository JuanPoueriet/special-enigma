import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateInvoiceUseCase,
  CreateInvoiceDto,
  GetInvoicesUseCase,
  GetSubscriptionPlansUseCase,
  GetPaymentHistoryUseCase
} from '../../../../application/src/index';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly getInvoicesUseCase: GetInvoicesUseCase,
    private readonly getSubscriptionPlansUseCase: GetSubscriptionPlansUseCase,
    private readonly getPaymentHistoryUseCase: GetPaymentHistoryUseCase
  ) {}

  @Post('invoices')
  async create(@Body() dto: CreateInvoiceDto) {
    return await this.createInvoiceUseCase.execute(dto);
  }

  @Get('invoices')
  async findAll() {
    return await this.getInvoicesUseCase.execute();
  }

  @Get('plans')
  async getPlans() {
    return await this.getSubscriptionPlansUseCase.execute();
  }

  @Get('history')
  async getHistory(@Query('tenantId') tenantId: string) {
    // Basic tenant handling - in real app should come from auth context
    const tid = tenantId || 'default-tenant';
    return await this.getPaymentHistoryUseCase.execute(tid);
  }
}
