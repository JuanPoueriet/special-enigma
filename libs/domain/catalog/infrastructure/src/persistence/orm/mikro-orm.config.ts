import { defineConfig } from '@mikro-orm/postgresql';
import { Product, Plugin, PluginVersion, TenantConsent, MeteringRecord } from '@virtex/domain-catalog-domain';
import { TenantModelSubscriber } from '@virtex/kernel-tenant';
import { getTenantContext } from '@virtex/kernel-auth';

const isProduction = process.env['NODE_ENV'] === 'production' || process.env['RELEASE_STAGE'] === 'production';

if (isProduction && !process.env['DB_PASSWORD']) {
  throw new Error('FATAL: DB_PASSWORD environment variable is mandatory in production.');
}

export default defineConfig({
  entities: [Product, Plugin, PluginVersion, TenantConsent, MeteringRecord],
  subscribers: [new TenantModelSubscriber()],
  filters: {
    tenant: {
      cond: () => {
        const context = getTenantContext();
        return context ? { tenantId: context.tenantId } : {};
      },
      entity: ['Product', 'Plugin', 'PluginVersion', 'TenantConsent', 'MeteringRecord'],
      default: true,
    },
  },
  dbName: 'virtex_catalog', // Domain specific DB
  host: process.env['DB_HOST'] || 'localhost',
  port: 5432,
  user: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASSWORD'] || 'dev-password-placeholder',
  debug: process.env['NODE_ENV'] !== 'production',
  replicas: [
    { name: 'read-1', host: process.env['DB_REPLICA_HOST'] || 'localhost' },
  ],
  migrations: {
    path: '../migrations',
    transactional: true,
  },
});
