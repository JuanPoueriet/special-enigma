import { Injectable, Inject, Logger } from '@nestjs/common';
import { Saga, SagaOrchestrator, SagaStep } from '@virtex/kernel-messaging';
import { CompleteOnboardingUseCase } from './complete-onboarding.use-case';
import { SubscribeToPlanUseCase } from '@virtex/domain-subscription-application';
import { CompleteOnboardingDto } from '@virtex/domain-identity-contracts';

export interface OnboardingContext {
  onboardingDto: CompleteOnboardingDto;
  planId: string;
  priceId: string;
  paymentMethodId: string;
  ip: string;
  userAgent: string;
  tenantId?: string;
  userId?: string;
}

@Injectable()
export class OnboardTenantSaga extends Saga<OnboardingContext> {
  constructor(
    context: OnboardingContext,
    private readonly onboardingUseCase: CompleteOnboardingUseCase,
    private readonly subscribeUseCase: SubscribeToPlanUseCase
  ) {
    super(context);
    this.setupSteps();
  }

  private setupSteps() {
    // Step 1: Create Identity and Tenant
    this.addStep({
      name: 'CreateIdentityAndTenant',
      invoke: async (ctx) => {
        const result = await this.onboardingUseCase.execute(ctx.onboardingDto, { ip: ctx.ip, userAgent: ctx.userAgent });
        ctx.tenantId = (result as any).user.id; // Corrected after checking CompleteOnboardingUseCase return
        // Note: CompleteOnboardingUseCase result.user.id is used as tenantId as per its logic
        ctx.userId = (result as any).user.id;
      },
      compensate: async (ctx) => {
        // Log manual intervention required for identity cleanup if needed.
        // In a real system, we'd delete the tenant/user if possible.
        console.error(`COMPENSATION: Manual cleanup required for failed onboarding of ${ctx.onboardingDto.companyName}`);
      }
    });

    // Step 2: Activate Subscription
    this.addStep({
      name: 'ActivateSubscription',
      invoke: async (ctx) => {
        if (!ctx.tenantId) throw new Error('Tenant ID missing for subscription');
        await this.subscribeUseCase.execute({
          tenantId: ctx.tenantId,
          planId: ctx.planId,
          price: ctx.priceId,
          billingCycle: 'monthly',
          email: ctx.onboardingDto.firstName + '@' + ctx.onboardingDto.companyName + '.com', // Simplified for POC
          name: ctx.onboardingDto.companyName,
          paymentMethodId: ctx.paymentMethodId
        });
      },
      compensate: async (ctx) => {
        // Compensation for subscription failure: Mark tenant as 'payment_pending' or similar
        console.error(`COMPENSATION: Subscription failed for tenant ${ctx.tenantId}, marking for manual billing follow-up`);
      }
    });
  }
}
