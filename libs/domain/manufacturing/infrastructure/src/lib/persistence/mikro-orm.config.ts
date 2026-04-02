import { defineConfig } from '@mikro-orm/postgresql';
import { ProductionOrder, ProductionOrderComponent, BillOfMaterials, BillOfMaterialsComponent } from '@virtex/domain-manufacturing-domain';
import { TenantModelSubscriber } from '@virtex/kernel-tenant';
import { getTenantContext } from '@virtex/kernel-auth';
import { join } from 'path';

if (process.env.NODE_ENV !== 'test' && !process.env.DB_PASSWORD) {
  throw new Error('CRITICAL: DB_PASSWORD environment variable is not set. Fail-fast for security.');
}

export default defineConfig({
  entities: [ProductionOrder, ProductionOrderComponent, BillOfMaterials, BillOfMaterialsComponent],
  subscribers: [new TenantModelSubscriber()],
  filters: {
    tenant: {
      cond: () => {
        const context = getTenantContext();
        return context ? { tenantId: context.tenantId } : {};
      },
      entity: ['ProductionOrder', 'BillOfMaterials', 'BillOfMaterialsComponent'],
      default: true,
    },
  },
  dbName: 'virtex_manufacturing',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: join(__dirname, '../migrations'),
    pathTs: join(__dirname, '../migrations'),
    transactional: true,
  },
});
