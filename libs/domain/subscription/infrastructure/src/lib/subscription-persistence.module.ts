import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CustomerIdentityService } from '@virtex/domain-subscription-domain';
import { SubscriptionSchema, SubscriptionPlanSchema } from './persistence/subscription.schemas';

@Module({
  imports: [
    MikroOrmModule.forFeature([SubscriptionSchema, SubscriptionPlanSchema])
  ],
  providers: [CustomerIdentityService],
  exports: [
    MikroOrmModule,
    CustomerIdentityService
  ]
})
export class SubscriptionPersistenceModule {}
