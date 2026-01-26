export enum TenantMode {
  SHARED = 'SHARED',
  SCHEMA = 'SCHEMA',
  DATABASE = 'DATABASE',
}

export interface TenantConfig {
  mode: TenantMode;
  connectionString?: string;
  schemaName?: string;
  tenantId: string;
}
