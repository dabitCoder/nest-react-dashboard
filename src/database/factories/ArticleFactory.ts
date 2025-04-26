import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Article } from '../../entities/articles.entity';

export class ArticleFactory extends Factory<Article> {
  model = Article;

  definition(): Partial<Article> {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3, '\n\n'),
      author: faker.person.fullName(),
      views: faker.number.int({ min: 0, max: 500 }),
      shares: faker.number.int({ min: 0, max: 200 }),
      summary: faker.lorem.sentences(1),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  }
}
