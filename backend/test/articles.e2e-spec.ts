import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ArticlesModule } from '../src/articles/articles.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Articles } from '../src/articles/entities/articles.entity';
import { MikroORM } from '@mikro-orm/mariadb';
import { ArticlesFactory } from '../src/database/factories/ArticlesFactory';
import testingDatabaseConfig from '../src/mikro-orm.testing.config';
import { FindArticlesDto, SortBy } from '../src/articles/dto/find-articles.dto';
import { CreateSummaryDto } from '../src/articles/dto/create-summary.dto';
import { AuthorFactory } from '../src/database/factories/AuthorsFactory';
import { Authors } from '../src/authors/entities/authors.entity';

describe('ArticlesController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...testingDatabaseConfig,
          allowGlobalContext: true,
        }),
        ArticlesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    orm = moduleFixture.get<MikroORM>(MikroORM);
  });

  afterEach(async () => {
    await orm.em.nativeDelete(Authors, {});
    await orm.em.nativeDelete(Articles, {});
  });

  afterAll(async () => {
    await orm.em.nativeDelete(Authors, {});
    await orm.em.nativeDelete(Articles, {});
    await orm.close();
    await app.close();
  });

  describe('/articles (GET)', () => {
    it('should return an array of articles', async () => {
      await new ArticlesFactory(orm.em).create(10);

      const response = await request(app.getHttpServer())
        .get('/articles')
        .expect(200);

      expect(response.body.data.length).toBe(10);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('title');
      expect(response.body.data).toHaveLength(10);
    });

    it('should return paginated articles - page 1', async () => {
      await new ArticlesFactory(orm.em).create(25);

      const dto: FindArticlesDto = { page: 1, limit: 5 };

      const response = await request(app.getHttpServer())
        .get('/articles')
        .query(dto)
        .expect(200);

      expect(response.body.data.length).toBe(5);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('title');
      expect(response.body.total).toBe(25);
    });

    it('should return paginated articles - page 2', async () => {
      await new ArticlesFactory(orm.em).create(25);

      const dto: FindArticlesDto = { page: 2, limit: 5 };

      const response = await request(app.getHttpServer())
        .get('/articles')
        .query(dto)
        .expect(200);

      expect(response.body.data.length).toBe(5);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('title');
      expect(response.body.total).toBe(25);
    });

    it('should return paginated articles - last page', async () => {
      await new ArticlesFactory(orm.em).create(25);

      const dto: FindArticlesDto = { page: 5, limit: 5 };

      const response = await request(app.getHttpServer())
        .get('/articles')
        .query(dto)
        .expect(200);

      expect(response.body.data.length).toBe(5);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('title');
      expect(response.body.total).toBe(25);
    });

    it('should return an empty array for out-of-range page', async () => {
      await new ArticlesFactory(orm.em).create(25);
      const dto: FindArticlesDto = { page: 10, limit: 5 };

      const response = await request(app.getHttpServer())
        .get('/articles')
        .query(dto)
        .expect(200);

      expect(response.body.data.length).toBe(0);
      expect(response.body.total).toBe(25);
    });

    it('should return paginated articles', async () => {
      await new ArticlesFactory(orm.em).create(25);

      const dto: FindArticlesDto = {
        page: 2,
        limit: 5,
      };

      const response = await request(app.getHttpServer())
        .get('/articles')
        .query(dto)
        .expect(200);

      expect(response.body.data.length).toBe(5);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('title');
      expect(response.body.total).toBe(25);
    });

    it('should filter articles by author', async () => {
      const testAuthor = await new AuthorFactory(orm.em).createOne({
        name: 'Test Author',
      });
      const otherAuthor = await new AuthorFactory(orm.em).createOne({
        name: 'Other Author',
      });

      await new ArticlesFactory(orm.em).create(5, { author: testAuthor });
      await new ArticlesFactory(orm.em).create(5, { author: otherAuthor });

      const dto: FindArticlesDto = {
        authorId: testAuthor.id.toString(),
      };

      const response = await request(app.getHttpServer())
        .get('/articles')
        .query(dto)
        .expect(200);

      expect(response.body.data.length).toBe(5);
      response.body.data.forEach((article: Articles) => {
        expect(article.author.name).toBe('Test Author');
        expect(article.author.id).toBe(testAuthor.id);
      });
      expect(response.body.total).toBe(5);
    });

    it('should sort articles by views in descending order', async () => {
      await new ArticlesFactory(orm.em).create(5, { views: 10 });
      await new ArticlesFactory(orm.em).create(5, { views: 5 });

      const dto: FindArticlesDto = { sortBy: SortBy.VIEWS, sortOrder: 'DESC' };

      const response = await request(app.getHttpServer())
        .get('/articles')
        .query(dto)
        .expect(200);

      expect(response.body.data.length).toBe(10);
      expect(response.body.data[0].views).toBe(10);
      expect(response.body.data[9].views).toBe(5);
      expect(response.body.total).toBe(10);
    });
  });

  describe('/articles/summary (POST)', () => {
    it('should return the summary of an article', async () => {
      const article = await new ArticlesFactory(orm.em).createOne({
        summary: 'Test Summary',
      });

      const dto: CreateSummaryDto = {
        articleId: article.id,
      };

      const response = await request(app.getHttpServer())
        .post('/articles/summary')
        .send(dto)
        .expect(201);

      expect(response.body.summary).toBe('Test Summary');
    });

    it('should return 404 if article is not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/articles/summary')
        .send({ articleId: 9999 });

      expect(response.status).toBe(404);
    });
  });
});
