import { TenantSubscriber } from '@virteex/infrastructure/lib/persistence/tenant.subscriber';
import { runWithTenantContext } from '@virteex/auth';
import { SampleEntity } from '@virteex/domain';
import { EventArgs, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from '@virteex/infrastructure/lib/persistence/mikro-orm.config';

describe('RLS Logic', () => {
  describe('TenantSubscriber', () => {
    it('should inject tenantId when context is present', async () => {
      const subscriber = new TenantSubscriber();
      const entity = new SampleEntity();
      const args = { entity } as EventArgs<SampleEntity>;

      await runWithTenantContext({ tenantId: 'tenant-1' } as any, async () => {
        await subscriber.beforeCreate(args);
      });

      expect(entity.tenantId).toBe('tenant-1');
    });

    it('should not inject tenantId when context is missing', async () => {
      const subscriber = new TenantSubscriber();
      const entity = new SampleEntity();
      const args = { entity } as EventArgs<SampleEntity>;

      await subscriber.beforeCreate(args);

      expect(entity.tenantId).toBeUndefined();
    });
  });

  describe('SampleEntity Filter', () => {
     it('should have the correct filter condition', async () => {
      const orm = await MikroORM.init({
        ...config,
        entities: config.entities, // Explicitly pass entities
        dbName: 'test',
        driver: PostgreSqlDriver,
        connect: false, // Do not connect
      });

      const filters = orm.config.get('filters');
      const filter = filters['tenant'];

      expect(filter).toBeDefined();
      expect(filter.default).toBe(true);
      expect(filter.entity).toContain('SampleEntity');

      const cond = filter.cond;
      if (typeof cond === 'function') {
          // cond signature: (args: Dictionary, type: 'read' | 'write', em: EntityManager, options?: FindOptions<T>) => FilterQuery<T>
          const result = runWithTenantContext({ tenantId: 'tenant-A' } as any, () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return (cond as any)({}, 'read', {} as any);
          });
          expect(result).toEqual({ tenantId: 'tenant-A' });

          const resultNoContext = (cond as any)({}, 'read', {} as any);
          expect(resultNoContext).toEqual({});
      } else {
          throw new Error('Filter condition should be a function');
      }
    });
  });
});
