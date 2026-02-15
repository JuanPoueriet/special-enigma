import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqliteDriver } from '@mikro-orm/sqlite';
import * as dotenv from 'dotenv';

dotenv.config();

const isPostgres = process.env.DB_DRIVER === 'postgres';

if (isPostgres && !process.env.DB_HOST) {
  throw new Error('DB_HOST environment variable is required for Postgres driver');
}

const config: Options = {
  driver: isPostgres ? PostgreSqlDriver : SqliteDriver,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: isPostgres ? parseInt(process.env.DB_PORT || '5432', 10) : undefined,
  driverOptions:
    isPostgres && process.env.NODE_ENV === 'production'
      ? {
          connection: {
            ssl: { rejectUnauthorized: false },
          },
        }
      : undefined,
  entities: ['./libs/domains/**/domain/src/lib/entities/*.entity.ts'],
  entitiesTs: ['./libs/domains/**/domain/src/lib/entities/*.entity.ts'],
  migrations: {
    path: './apps/virteex-api-gateway/src/migrations',
    pathTs: './apps/virteex-api-gateway/src/migrations',
    disableForeignKeys: false,
  },
};

export default config;
