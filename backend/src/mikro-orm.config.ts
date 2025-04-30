import { defineConfig, MariaDbDriver, Options } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const config: Options = {
  driver: MariaDbDriver,
  host: process.env.API_DB_HOST ?? 'localhost',
  port: parseInt(process.env.API_DB_PORT) ?? 3306,
  user: process.env.API_DB_USER ?? 'root',
  password: process.env.API_DB_PASSWORD ?? '',
  dbName: process.env.API_DB_NAME ?? 'nest-dashboard',
  entities: ['./dist/**/entities/**.js'],
  entitiesTs: ['./src/**/entities/**.ts'],
  extensions: [Migrator, SeedManager],
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
    fileName: (timestamp: string, name?: string) => {
      if (!name) {
        throw new Error(
          'Specify migration name via `mikro-orm migration:create --name=...`',
        );
      }
      return `${timestamp}_${name}`;
    },
  },
  seeder: {
    path: './dist/database/seeders',
    pathTs: './src/database/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default defineConfig(config);
