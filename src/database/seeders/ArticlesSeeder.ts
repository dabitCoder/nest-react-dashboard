import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ArticlesFactory } from '../factories/ArticlesFactory';

export class ArticlesSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new ArticlesFactory(em).create(50);
  }
}
