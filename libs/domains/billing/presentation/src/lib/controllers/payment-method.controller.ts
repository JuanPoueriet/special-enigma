import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AddPaymentMethodUseCase, AddPaymentMethodDto } from '@virteex/billing-application';
import { GetPaymentMethodUseCase } from '@virteex/billing-application';

@ApiTags('Billing')
@Controller('billing/payment-methods')
export class PaymentMethodController {
  constructor(
    private readonly addPaymentMethodUseCase: AddPaymentMethodUseCase,
    private readonly getPaymentMethodUseCase: GetPaymentMethodUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a payment method' })
  create(@Body() dto: AddPaymentMethodDto) {
    return this.addPaymentMethodUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get payment methods by tenant' })
  findAll(@Query('tenantId') tenantId: string) {
    return this.getPaymentMethodUseCase.execute(tenantId);
  }
}
