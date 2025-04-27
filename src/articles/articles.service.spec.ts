import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Articles } from './entities/articles.entity';
import { MikroORM } from '@mikro-orm/mariadb';
import { ArticlesFactory } from '../database/factories/ArticlesFactory';
import { testingDatabaseConfig } from '../mikro-orm.testing.config';
import { InternalServerErrorException } from '@nestjs/common';
import { FindArticlesDto, SortBy } from './dto/find-articles.dto';
import { faker } from '@faker-js/faker';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...testingDatabaseConfig,
          autoLoadEntities: true,
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature([Articles]),
      ],
      providers: [ArticlesService],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    orm = module.get<MikroORM>(MikroORM);
  });

  afterEach(async () => {
    await orm.em.nativeDelete(Articles, {});
  });

  afterAll(async () => {
    await orm.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be able to return an array of articles', async () => {
      await new ArticlesFactory(orm.em).create(10);

      const actual = await service.findAll(null);

      expect(actual.length).toBe(10);
      actual.forEach((article) => {
        expect(article.title).not.toBeNull();
        expect(article.content).not.toBeNull();
        expect(article.author).not.toBeNull();
        expect(article.views).not.toBeNull();
        expect(article.shares).not.toBeNull();
        expect(article.summary).not.toBeNull();
      });
    });

    it('should return an empty array if there are no articles', async () => {
      const actual = await service.findAll();
      expect(actual).toEqual([]);
    });

    it('should return an error if something goes wrong', async () => {
      jest
        .spyOn(service['repository'], 'findAll')
        .mockRejectedValueOnce(new InternalServerErrorException());

      await expect(service.findAll()).rejects.toThrow();
    });

    describe('filters', () => {
      beforeEach(async () => {
        await new ArticlesFactory(orm.em).create(5, {
          author: 'Testing author',
        });
        await new ArticlesFactory(orm.em).create(10, { author: 'John Doe' });
      });

      it('should filter articles by author', async () => {
        const dto: FindArticlesDto = {
          author: 'Testing author',
        };

        const actual = await service.findAll(dto);
        expect(actual.length).toBe(5);

        actual.forEach((article) => {
          expect(article.author).toEqual(dto.author);
        });
      });

      it('should return an empty array if authors do not have articles', async () => {
        const dto: FindArticlesDto = {
          author: 'Hello Reviewers',
        };

        const actual = await service.findAll(dto);
        expect(actual.length).toBe(0);
        expect(actual).toEqual([]);
      });
    });

    describe('sorting', () => {
      it('should be able to sort article views in ascending order', async () => {
        await new ArticlesFactory(orm.em).create(5, {
          views: 5,
        });

        await new ArticlesFactory(orm.em).create(5, {
          views: 10,
        });

        const dto: FindArticlesDto = {
          sortBy: SortBy.VIEWS,
          sortOrder: 'DESC',
        };

        const actual = await service.findAll(dto);

        expect(actual.length).toBe(10);
        expect(actual[0].views).toEqual(10);
        expect(actual[actual.length - 1].views).toEqual(5);
      });

      it('should be able to sort article views in descending order', async () => {
        await new ArticlesFactory(orm.em).create(5, {
          views: 10,
        });

        await new ArticlesFactory(orm.em).create(5, {
          views: 1,
        });

        const dto: FindArticlesDto = {
          sortBy: SortBy.VIEWS,
          sortOrder: 'ASC',
        };

        const actual = await service.findAll(dto);

        expect(actual.length).toBe(10);
        expect(actual[0].views).toEqual(1);
        expect(actual[actual.length - 1].views).toEqual(10);
      });

      it('should be able to sort articles by shares in ascending order', async () => {
        await new ArticlesFactory(orm.em).create(5, {
          shares: 5,
        });

        await new ArticlesFactory(orm.em).create(5, {
          shares: 10,
        });

        const dto: FindArticlesDto = {
          sortBy: SortBy.SHARES,
          sortOrder: 'DESC',
        };

        const actual = await service.findAll(dto);

        expect(actual.length).toBe(10);
        expect(actual[0].shares).toEqual(10);
        expect(actual[actual.length - 1].shares).toEqual(5);
      });

      it('should be able to sort articles by shares in descending order', async () => {
        await new ArticlesFactory(orm.em).create(5, {
          shares: 10,
        });

        await new ArticlesFactory(orm.em).create(5, {
          shares: 1,
        });

        const dto: FindArticlesDto = {
          sortBy: SortBy.SHARES,
          sortOrder: 'ASC',
        };

        const actual = await service.findAll(dto);

        expect(actual.length).toBe(10);
        expect(actual[0].shares).toEqual(1);
        expect(actual[actual.length - 1].shares).toEqual(10);
      });

      it('should handle default sorting if not provided', async () => {
        await new ArticlesFactory(orm.em).create(5, {
          shares: 10,
        });

        await new ArticlesFactory(orm.em).create(5, {
          shares: 1,
        });

        const dto: FindArticlesDto = {
          sortBy: SortBy.SHARES,
        };

        const actual = await service.findAll(dto);

        expect(actual.length).toBe(10);
        expect(actual[0].shares).toEqual(1);
        expect(actual[actual.length - 1].shares).toEqual(10);
      });
    });

    describe('search', () => {
      it('should be able to search by title', async () => {
        await new ArticlesFactory(orm.em).create(5, {
          title: 'testing',
        });

        await new ArticlesFactory(orm.em).create(1, {
          title: 'hello reviewer',
        });

        const dto: FindArticlesDto = {
          searchTerm: 'testing',
        };

        const actual = await service.findAll(dto);
        expect(actual.length).toBe(5);

        actual.forEach((item) => {
          expect(item.title).toEqual('testing');
        });
      });

      it('should be able to search by content', async () => {
        await new ArticlesFactory(orm.em).create(1, {
          content:
            "Life before Death, Strength Before Weakness, Journey before Destination',",
        });

        await new ArticlesFactory(orm.em).create(3, {
          content: faker.string.fromCharacters('abcdefghi'),
        });

        const dto: FindArticlesDto = {
          searchTerm: 'before',
        };

        const actual = await service.findAll(dto);
        expect(actual.length).toBe(1);
      });

      it('should return an empty array if articles do not match with searchTerm', async () => {
        await new ArticlesFactory(orm.em).create(1, {
          title: 'testing',
          content:
            'I write these words in steel, for anything not set in metal cannot be trusted',
        });

        const dto: FindArticlesDto = {
          searchTerm: 'hello good morning',
        };

        const actual = await service.findAll(dto);
        expect(actual.length).toBe(0);
      });
    });
  });
});
