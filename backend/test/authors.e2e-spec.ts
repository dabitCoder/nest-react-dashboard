import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/mariadb';
import testingDatabaseConfig from '../src/mikro-orm.testing.config';
import { AuthorsModule } from '../src/authors/authors.module';
import { Authors } from '../src/authors/entities/authors.entity';
import { AuthorFactory } from '../src/database/factories/AuthorsFactory';

describe('AuthorsController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...testingDatabaseConfig,
          allowGlobalContext: true,
        }),
        AuthorsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    orm = moduleFixture.get<MikroORM>(MikroORM);
  });

  afterEach(async () => {
    await orm.em.nativeDelete(Authors, {});
  });

  afterAll(async () => {
    await orm.close();
    await app.close();
  });

  describe('/authors (GET)', () => {
    it('should return an array of authors', async () => {
      await new AuthorFactory(orm.em).create(10);

      const response = await request(app.getHttpServer())
        .get('/authors')
        .expect(200);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(10);
      response.body.forEach((author) => {
        expect(author).toHaveProperty('id');
        expect(author).toHaveProperty('name');
      });
    });

    it('should return an empty response if there are no authors', async () => {
      const response = await request(app.getHttpServer())
        .get('/authors')
        .expect(200);

      expect(response.body.length).toBe(0);
    });
  });
});
