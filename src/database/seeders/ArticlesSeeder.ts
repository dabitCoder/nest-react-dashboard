import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ArticleFactory } from '../factories/ArticleFactory';

export class ArticlesSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new ArticleFactory(em).create(50);
  }
}
