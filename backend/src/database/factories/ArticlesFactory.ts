import { Factory } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { Articles } from '../../articles/entities/articles.entity';
import { faker } from '@faker-js/faker';
import { AuthorFactory } from './AuthorsFactory';

export class ArticlesFactory extends Factory<Articles> {
  model = Articles;
  protected readonly authorFactory: AuthorFactory;

  constructor(em: EntityManager) {
    super(em);
    this.authorFactory = new AuthorFactory(em);
  }

  definition = (): Partial<Articles> => {
    const author = this.authorFactory.makeOne();

    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3, '\n\n'),
      author,
      views: faker.number.int({ min: 0, max: 500 }),
      shares: faker.number.int({ min: 0, max: 200 }),
      summary: faker.lorem.sentences(1),
    };
  };
}
