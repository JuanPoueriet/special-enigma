import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProcessPaymentUseCase, CreateCheckoutSessionUseCase } from '@virtex/domain-billing-application';
import { JwtAuthGuard, TenantGuard } from '@virtex/kernel-auth';
import { CurrentTenant } from '@virtex/kernel-tenant-context';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';

@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(
    private readonly processPaymentUseCase: ProcessPaymentUseCase,
    private readonly createCheckoutSessionUseCase: CreateCheckoutSessionUseCase
  ) {}

  @Post('checkout-session')
  @RequireEntitlement('invoices')
  async createCheckoutSession(@Body() body: { planId: string }, @CurrentTenant() tenantId: string) {
    this.logger.log(`Received checkout session request for plan ${body.planId} and tenant ${tenantId}`);
    return await this.createCheckoutSessionUseCase.execute(body.planId, tenantId);
  }

  @Post()
  @RequireEntitlement('invoices')
  async processPayment(@Body() body: { amount: number; currency: string; source: string }) {
    this.logger.log(`Received payment request: ${JSON.stringify(body)}`);
    return this.processPaymentUseCase.execute(body.amount, body.currency, body.source);
  }
}
