import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '@virtex/domain-identity-domain';
import { EntitlementService, UsageProvider } from '@virtex/kernel-entitlements';

@Injectable()
export class UserUsageProvider implements UsageProvider, OnModuleInit {
  constructor(
    private readonly entitlementService: EntitlementService,
    private readonly userRepository: UserRepository,
  ) {}

  onModuleInit() {
    this.entitlementService.registerUsageProvider(this);
  }

  getResource(): string {
    return 'users';
  }

  async countUsage(tenantId: string): Promise<number> {
    const { total } = await this.userRepository.findAll({
      page: 1,
      pageSize: 1,
      tenantId,
    });
    return total;
  }
}

@Injectable()
export class SeatUsageProvider implements UsageProvider, OnModuleInit {
  constructor(
    private readonly entitlementService: EntitlementService,
    private readonly userRepository: UserRepository,
  ) {}

  onModuleInit() {
    this.entitlementService.registerUsageProvider(this);
  }

  getResource(): string {
    return 'seats';
  }

  async countUsage(tenantId: string): Promise<number> {
    const { total } = await this.userRepository.findAll({
      page: 1,
      pageSize: 1,
      tenantId,
    });
    return total;
  }
}

@Injectable()
export class InvitationUsageProvider implements UsageProvider, OnModuleInit {
  constructor(
    private readonly entitlementService: EntitlementService,
    private readonly userRepository: UserRepository,
  ) {}

  onModuleInit() {
    this.entitlementService.registerUsageProvider(this);
  }

  getResource(): string {
    return 'invitations';
  }

  async countUsage(tenantId: string, period: 'monthly' | 'lifetime'): Promise<number> {
    const options: any = {
      page: 1,
      pageSize: 1,
      tenantId,
      statusFilter: 'INVITED',
    };

    if (period === 'monthly') {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      options.createdAfter = firstDayOfMonth; // Assuming repository supports this or similar filter
    }

    const { total } = await this.userRepository.findAll(options);
    return total;
  }
}
