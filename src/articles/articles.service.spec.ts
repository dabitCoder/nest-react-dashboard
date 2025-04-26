import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Articles } from './entities/articles.entity';
import { MikroORM } from '@mikro-orm/mariadb';
import { ArticlesFactory } from '../database/factories/ArticlesFactory';
import { testingDatabaseConfig } from '../mikro-orm.testing.config';
import { InternalServerErrorException } from '@nestjs/common';

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
  });
});
