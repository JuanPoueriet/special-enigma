import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME || 'virteex',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  entities: ['./libs/domains/**/domain/src/lib/entities/*.entity.ts'],
  entitiesTs: ['./libs/domains/**/domain/src/lib/entities/*.entity.ts'],
  migrations: {
    path: './apps/virteex-api-gateway/src/migrations',
    pathTs: './apps/virteex-api-gateway/src/migrations',
    disableForeignKeys: false,
  },
};

export default config;
