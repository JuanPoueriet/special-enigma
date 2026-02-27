import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Subscription,
  SubscriptionPlan,
  CustomerIdentityService,
  SUBSCRIPTION_REPOSITORY,
  CUSTOMER_REGISTRY_GATEWAY
} from '@virteex/domain-subscription-domain';

@Module({
  imports: [
    MikroOrmModule.forFeature([Subscription, SubscriptionPlan])
  ],
  providers: [
    {
      provide: CustomerIdentityService,
      useFactory: (repo, gateway) => new CustomerIdentityService(repo, gateway),
      inject: [SUBSCRIPTION_REPOSITORY, CUSTOMER_REGISTRY_GATEWAY]
    }
  ],
  exports: [
    MikroOrmModule,
    CustomerIdentityService
  ]
})
export class SubscriptionDomainModule {}
