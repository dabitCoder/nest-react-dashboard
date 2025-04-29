import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/mariadb';
import testingDatabaseConfig from '../mikro-orm.testing.config';
import { Authors } from './entities/authors.entity';
import { AuthorsService } from './authors.service';
import { AuthorFactory } from '../database/factories/AuthorsFactory';
import { InternalServerErrorException } from '@nestjs/common';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let orm: MikroORM;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...testingDatabaseConfig,
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature([Authors]),
      ],
      providers: [AuthorsService],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    orm = module.get<MikroORM>(MikroORM);
  });

  afterEach(async () => {
    await orm.em.nativeDelete(Authors, {});
  });

  afterAll(async () => {
    await orm.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      await new AuthorFactory(orm.em).create(20);

      const actual = await service.findAll();
      expect(actual.length).toBe(20);

      actual.forEach((author) => {
        expect(author.id).toBeGreaterThan(0);
        expect(author.name).not.toBeNull();
      });
    });

    it('should return an empty array if no authors exist', async () => {
      const actual = await service.findAll();
      expect(actual.length).toBe(0);
    });

    it('should return an error if something goes wrong', async () => {
      jest
        .spyOn(service['repository'], 'findAll')
        .mockRejectedValueOnce(new InternalServerErrorException());

      await expect(service.findAll()).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
