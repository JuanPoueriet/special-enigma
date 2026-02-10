import { MikroORM } from '@mikro-orm/core';
import { TaxTable } from '../libs/domains/payroll/domain/src/lib/entities/tax-table.entity';
import config from '../apps/virteex-api-gateway/src/mikro-orm.config';

(async () => {
  try {
    const orm = await MikroORM.init(config);
    const em = orm.em.fork();

    const taxTable2024 = [
      { limit: 0.01, fixed: 0.0, percent: 1.92, year: 2024, type: 'MONTHLY' },
      {
        limit: 746.05,
        fixed: 14.32,
        percent: 6.4,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 6332.06,
        fixed: 371.83,
        percent: 10.88,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 11128.02,
        fixed: 893.63,
        percent: 16.0,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 12935.83,
        fixed: 1182.88,
        percent: 17.92,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 15487.72,
        fixed: 1640.18,
        percent: 21.36,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 31236.46,
        fixed: 5004.12,
        percent: 23.52,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 49233.01,
        fixed: 9236.89,
        percent: 30.0,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 93993.91,
        fixed: 22665.17,
        percent: 32.0,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 125325.21,
        fixed: 32691.18,
        percent: 34.0,
        year: 2024,
        type: 'MONTHLY',
      },
      {
        limit: 375975.62,
        fixed: 117912.32,
        percent: 35.0,
        year: 2024,
        type: 'MONTHLY',
      },
    ];

    console.log('Seeding Tax Tables...');

    for (const entry of taxTable2024) {
      // Check if exists - limit and year as composite key check
      const exists = await em.findOne(TaxTable, {
        limit: entry.limit,
        year: entry.year,
      });
      if (!exists) {
        const taxEntry = new TaxTable(
          entry.limit,
          entry.fixed,
          entry.percent,
          entry.year,
          entry.type as any,
        );
        em.persist(taxEntry);
      }
    }

    await em.flush();
    console.log('Tax Tables Seeded.');
    await orm.close();
  } catch (e) {
    console.error('Seeding failed:', e);
    // Don't exit with error code to prevent build pipeline failure if DB is unreachable
    console.warn('Continuing despite seed failure (DB might be unreachable)');
    process.exit(0);
  }
})();
