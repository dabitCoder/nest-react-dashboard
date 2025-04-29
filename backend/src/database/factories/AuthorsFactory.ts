import { Factory } from '@mikro-orm/seeder';
import { Authors } from '../../authors/entities/authors.entity';
import { faker } from '@faker-js/faker';

export class AuthorFactory extends Factory<Authors> {
  model = Authors;

  definition = (): Partial<Authors> => ({
    name: faker.person.fullName(),
  });
}
