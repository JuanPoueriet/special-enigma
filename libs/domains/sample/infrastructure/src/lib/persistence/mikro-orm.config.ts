import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  entities: [], // To be filled with domain entities
  dbName: 'virteex',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  debug: true,
  // This will be important for RLS
  driverOptions: {
    connection: {
       // ssl: { rejectUnauthorized: false }
    }
  }
});
