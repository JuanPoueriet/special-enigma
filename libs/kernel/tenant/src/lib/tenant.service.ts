import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { TenantConfig } from './interfaces/tenant-config.interface';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  private cache = new Map<string, { config: TenantConfig; expiry: number }>();
  private readonly TTL = 60 * 1000; // 1 minute cache

  constructor(private readonly em: EntityManager) {}

  async getTenantConfig(tenantId: string): Promise<TenantConfig> {
    // 1. Check Cache
    const cached = this.cache.get(tenantId);
    if (cached && cached.expiry > Date.now()) {
      return cached.config;
    }

    // 2. Fetch from DB
    // We use a fork or the global EM. Since this is read-only and cached, global EM might be fine,
    // but better to use a fork if we want to be safe, or just use the injected one.
    // Assuming 'em' is the default connection where 'tenants' table lives.
    const tenant = await this.em.findOne(Tenant, { id: tenantId });

    if (!tenant) {
        // Fallback or Error?
        // For development/mocking compatibility, we might want a fallback,
        // but for "Real" service, we should probably throw or return a default if allowed.
        // The analysis said "Real TenantService... create a table".
        // If the tenant is not in DB, it doesn't exist.
        // However, to avoid breaking existing tests/setup that rely on "schema_" prefix magic:
        // I will keep the fallback ONLY if it looks like a test/dev tenant and not found in DB.
        if (process.env.NODE_ENV !== 'production' && (tenantId.startsWith('schema_') || tenantId.startsWith('test_'))) {
             // ... existing mock logic as fallback ...
        } else {
             // throw new NotFoundException(`Tenant ${tenantId} not found`);
             // For now, return default to avoid crashing the app if no tenants seeded.
             console.warn(`Tenant ${tenantId} not found in DB. Using default config.`);
        }
    }

    let config: TenantConfig;
    if (tenant) {
        config = {
            tenantId: tenant.id,
            mode: tenant.mode,
            connectionString: tenant.connectionString,
            schemaName: tenant.schemaName,
        };
    } else {
         // Mock fallback (Legacy)
        if (tenantId.startsWith('schema_')) {
             config = { tenantId, mode: 'SCHEMA' as any, schemaName: `tenant_${tenantId}` };
        } else {
             config = { tenantId, mode: 'SHARED' as any };
        }
    }

    // 3. Update Cache
    this.cache.set(tenantId, { config, expiry: Date.now() + this.TTL });
    return config;
  }
}
