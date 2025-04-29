import { SeedManager } from '@mikro-orm/seeder';
import { defineConfig, MariaDbDriver } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';

const testingDatabaseConfig = defineConfig({
  driver: MariaDbDriver,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  dbName: 'nest-dashboard-test',
  entities: ['./dist/**/entities/**.js'],
  entitiesTs: ['./src/**/entities/**.ts'],
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
  },
  seeder: {
    path: './dist/database/seeders',
    pathTs: './src/database/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
});

export default testingDatabaseConfig;
