import { defineConfig, MariaDbDriver } from '@mikro-orm/mariadb';

const testingDatabaseConfig = defineConfig({
  dbName: 'nest-dashboard-test',
  driver: MariaDbDriver,
  entitiesTs: ['./**/*.entity.ts'],
  entities: ['../dist/**/*.entity.js'],
  driverOptions: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest-dashboard-test',
  },
});

export default testingDatabaseConfig;
