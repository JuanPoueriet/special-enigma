import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateSubscriptionUseCase,
  CreateSubscriptionDto,
  GetSubscriptionUseCase
} from '../../../../application/src/index';

@ApiTags('Billing')
@Controller('billing/subscription')
export class SubscriptionController {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
    private readonly getSubscriptionUseCase: GetSubscriptionUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a subscription' })
  async create(@Body() dto: CreateSubscriptionDto) {
    return await this.createSubscriptionUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get subscription by tenant' })
  async findOne(@Query('tenantId') tenantId: string) {
    const tid = tenantId || 'default-tenant';
    return await this.getSubscriptionUseCase.execute(tid);
  }
}
