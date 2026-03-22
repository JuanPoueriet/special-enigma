import { Tenant } from '@virteex/kernel-tenant';

export interface TenantRepository {
  findById(id: string): Promise<Tenant | null>;
  save(tenant: Tenant): Promise<void>;
}

export const TENANT_REPOSITORY = 'TENANT_REPOSITORY';
