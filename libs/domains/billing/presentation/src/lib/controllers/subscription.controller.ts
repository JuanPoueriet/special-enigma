import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateSubscriptionUseCase, CreateSubscriptionDto } from '@virteex/billing-application';
import { GetSubscriptionUseCase } from '@virteex/billing-application';

@ApiTags('Billing')
@Controller('billing/subscription')
export class SubscriptionController {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
    private readonly getSubscriptionUseCase: GetSubscriptionUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a subscription' })
  create(@Body() dto: CreateSubscriptionDto) {
    return this.createSubscriptionUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get subscription by tenant' })
  findOne(@Query('tenantId') tenantId: string) {
    return this.getSubscriptionUseCase.execute(tenantId);
  }
}
