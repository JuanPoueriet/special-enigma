import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { EntitlementService, UsageProvider } from '@virteex/kernel-entitlements';
import { SaleRepository } from '@virteex/domain-crm-domain';

@Injectable()
export class SaleUsageProvider implements UsageProvider, OnModuleInit {
  constructor(
    private readonly entitlementService: EntitlementService,
    @Inject('SaleRepository')
    private readonly saleRepository: SaleRepository,
  ) {}

  onModuleInit() {
    this.entitlementService.registerUsageProvider(this);
  }

  getResource(): string {
    return 'sales';
  }

  async countUsage(tenantId: string): Promise<number> {
    const sales = await this.saleRepository.findAll(tenantId);
    return sales.length;
  }
}
