import { Injectable } from '@nestjs/common';
import { Articles } from './entities/articles.entity';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mariadb';
import { FindArticlesDto } from './dto/find-articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly repository: EntityRepository<Articles>,
  ) {}

  findAll(params: FindArticlesDto = {}): Promise<Articles[]> {
    if (params) {
      const { author, sortBy, sortOrder } = params;
      const where: any = {};
      const orderBy: any = {};

      if (author) {
        where.author = author;
      }

      if (sortBy) {
        orderBy.sortBy = sortOrder;
      }

      return this.repository.findAll({ where, orderBy });
    } else {
      return this.repository.findAll();
    }
  }
}
