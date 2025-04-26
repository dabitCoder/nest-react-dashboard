import { defineConfig, MariaDbDriver } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

export const testingDatabaseConfig = defineConfig({
  extensions: [Migrator, SeedManager],
  dbName: 'nest-dashboard-test',
  driver: MariaDbDriver,
  driverOptions: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest-dashboard-test',
  },
});
