import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type InvoiceRepository, INVOICE_REPOSITORY } from '@virteex/domain-billing-domain';
import { type SubscriptionRepository, SUBSCRIPTION_REPOSITORY } from '@virteex/domain-subscription-domain';

export interface UsageItem {
  resource: string;
  used: number;
  limit: number;
  type: string;
  isUnlimited: boolean;
  isEnabled: boolean;
}

import { USER_READ_PORT, type UserReadPort } from '../../ports/user-read.port';
import { STORAGE_READ_PORT, type StorageReadPort } from '../../ports/storage-read.port';
import { PlanLimitMapper } from '@virteex/domain-subscription-domain';

@Injectable()
export class GetUsageUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository,
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepository,
    @Inject(USER_READ_PORT) private readonly userReadPort: UserReadPort,
    @Inject(STORAGE_READ_PORT) private readonly storageReadPort: StorageReadPort,
    private readonly configService: ConfigService
  ) {}

  async execute(tenantId: string): Promise<UsageItem[]> {
    const invoiceCount = await this.invoiceRepository.countByTenantId(tenantId);
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const userCount = await this.userReadPort.getUserCount(tenantId);
    const storageCount = await this.storageReadPort.getFileCount(tenantId);

    // Default Limits if no subscription (e.g., Free Tier or Trial fallback)
    let limits = {
      invoices: this.configService.get<number>('DEFAULT_INVOICE_LIMIT', 10),
      users: this.configService.get<number>('DEFAULT_USER_LIMIT', 1),
      storage: this.configService.get<number>('DEFAULT_STORAGE_LIMIT', 50)
    };

    if (subscription && subscription.isValid() && subscription.getPlan()) {
       const planLimits = subscription.getPlan().limits;
       const structured = PlanLimitMapper.toStructuredLimits(planLimits) as any;
       limits = {
           invoices: structured['invoices'] ? structured['invoices'].limit : limits.invoices,
           users: structured['users'] ? structured['users'].limit : limits.users,
           storage: structured['storage'] ? structured['storage'].limit : limits.storage
       };
    }

    return [
      {
        resource: 'Invoices',
        used: invoiceCount,
        limit: limits.invoices === -1 ? Infinity : limits.invoices,
        type: 'numeric',
        isUnlimited: limits.invoices === -1,
        isEnabled: true
      },
      {
        resource: 'Users',
        used: userCount,
        limit: limits.users === -1 ? Infinity : limits.users,
        type: 'numeric',
        isUnlimited: limits.users === -1,
        isEnabled: true
      },
      {
        resource: 'Storage',
        used: storageCount,
        limit: limits.storage === -1 ? Infinity : limits.storage,
        type: 'numeric',
        isUnlimited: limits.storage === -1,
        isEnabled: true
      }
    ];
  }
}
