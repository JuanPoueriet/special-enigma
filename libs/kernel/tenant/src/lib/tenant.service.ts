import { Injectable } from '@nestjs/common';
import { TenantConfig, TenantMode } from './interfaces/tenant-config.interface';

@Injectable()
export class TenantService {
  async getTenantConfig(tenantId: string): Promise<TenantConfig> {
    // Mock logic for now
    // In real implementation, this would query a central Tenant Catalog (DB or Service)

    if (tenantId.startsWith('schema_')) {
      return {
        tenantId,
        mode: TenantMode.SCHEMA,
        schemaName: `tenant_${tenantId}`,
      };
    }

    // Future implementation for DATABASE mode
    /*
    else if (tenantId.startsWith('db_')) {
        return {
            tenantId,
            mode: TenantMode.DATABASE,
            connectionString: process.env['DB_CONNECTION_STRING_TEMPLATE']?.replace('{{tenantId}}', tenantId),
        };
    }
    */

    // Default to SHARED
    return {
      tenantId,
      mode: TenantMode.SHARED,
    };
  }
}
