import { defineConfig } from '@mikro-orm/postgresql';
import { Product } from '@virteex-erp/catalog-domain';
import { TenantModelSubscriber } from '@virteex-erp/tenant';
import { getTenantContext } from '@virteex-erp/auth';

export default defineConfig({
  entities: [Product],
  subscribers: [new TenantModelSubscriber()],
  filters: {
    tenant: {
      cond: () => {
        const context = getTenantContext();
        return context ? { tenantId: context.tenantId } : {};
      },
      entity: ['Product'],
      default: true,
    },
  },
  dbName: 'virteex_catalog', // Domain specific DB
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  debug: process.env.NODE_ENV !== 'production',
});
