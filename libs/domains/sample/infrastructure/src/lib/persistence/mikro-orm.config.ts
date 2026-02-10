import { defineConfig } from '@mikro-orm/postgresql';
import { SampleEntity } from '@virteex/sample-domain';
import { TenantSubscriber } from '@virteex/infrastructure/lib/persistence/tenant.subscriber';
import { getTenantContext } from '@virteex/auth';

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
      ssl: process.env['DB_SSL_ENABLED'] === 'true' || process.env['NODE_ENV'] === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
    }
  }
});
