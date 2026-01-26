import { defineConfig } from '@mikro-orm/postgresql';
import { SampleEntity } from '@virteex-erp/domain';
import { TenantSubscriber } from './tenant.subscriber';
import { getTenantContext } from '@virteex-erp/auth';

export default defineConfig({
  entities: [SampleEntity],
  subscribers: [new TenantSubscriber()],
  filters: {
    tenant: {
      cond: () => {
        const context = getTenantContext();
        return context ? { tenantId: context.tenantId } : {};
      },
      entity: ['SampleEntity'],
      default: true,
    },
  },
  dbName: 'virteex',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  debug: true,
  driverOptions: {
    connection: {
       // ssl: { rejectUnauthorized: false }
    }
  }
});
