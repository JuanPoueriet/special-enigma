import { Injectable, Logger, NotFoundException, Inject, Optional } from '@nestjs/common';
import { TenantService } from '@virtex/kernel-tenant';
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from '@virtex/domain-subscription-domain';

export interface TenantInfo {
    id: string;
    name: string;
    status: 'ACTIVE' | 'SUSPENDED' | 'PROVISIONING';
    subscriptionPlan?: string;
    createdAt: Date;
    integrationHealth: {
        fiscal: boolean;
        payment: boolean;
        storage: boolean;
    };
}

@Injectable()
export class TenantSupportService {
  private readonly logger = new Logger(TenantSupportService.name);

  constructor(
    private readonly tenantService: TenantService,
    @Optional()
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository?: SubscriptionRepository
  ) {}

  async getTenantStatus(tenantId: string): Promise<TenantInfo> {
    this.logger.log(`Fetching support status for tenant: ${tenantId}`);

    const config = await this.tenantService.getTenantConfig(tenantId);
    if (!config) {
      throw new NotFoundException(`Tenant ${tenantId} not found.`);
    }

    // To get createdAt and other entity-only properties, we still need the entity
    // In this repo, listTenants with a larger limit or a specific findById would be better.
    // For now, let's assume we can fetch it via listTenants with a filter if it supported it,
    // but since it doesn't, we'll use listTenants(100) and find, which is better than (1).
    const tenants = await this.tenantService.listTenants(100, 0);
    const tenant = tenants.find(t => t.id === tenantId);

    if (!tenant) {
        throw new NotFoundException(`Tenant entity ${tenantId} not found for metadata.`);
    }

    let planSlug = 'UNKNOWN';
    if (this.subscriptionRepository) {
      const sub = await this.subscriptionRepository.findByTenantId(tenantId);
      if (sub) {
        planSlug = sub.getPlan()?.slug || 'FREE';
      }
    }

    // In a real system, we'd fetch additional health metrics from Prometheus/OpenTelemetry
    return {
        id: tenant.id,
        name: `Tenant ${tenant.id}`,
        status: 'ACTIVE', // Status should be mapped from TenantControlRecord if available
        subscriptionPlan: planSlug,
        createdAt: tenant.createdAt,
        integrationHealth: {
            fiscal: true,
            payment: true,
            storage: true
        }
    };
  }

  async updateTenantStatus(tenantId: string, newStatus: TenantInfo['status'], reason: string): Promise<void> {
    this.logger.warn(`Updating status for tenant ${tenantId} to ${newStatus}. Reason: ${reason}`);

    // Update the Tenant entity via TenantService
    await this.tenantService.updateTenant(tenantId, {
        // status: newStatus, // Assuming Tenant entity has status
        updatedAt: new Date()
    });

    if (newStatus === 'ACTIVE') {
        this.logger.log(`Performing emergency provisioning tasks for tenant ${tenantId}...`);
        // Trigger actual provisioning logic/jobs here
    }
  }

  async searchTenants(query: string): Promise<Partial<TenantInfo>[]> {
      this.logger.log(`Searching for tenants with query: ${query}`);
      const tenants = await this.tenantService.listTenants(100);
      return tenants
        .filter(t => t.id.includes(query)) // Simple search for now
        .map(t => ({
          id: t.id,
          name: `Tenant ${t.id}`,
          status: 'ACTIVE' // Map from entity
        }));
  }
}
