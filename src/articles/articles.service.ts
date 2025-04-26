import { Injectable } from '@nestjs/common';
import { Articles } from './entities/articles.entity';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mariadb';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly repository: EntityRepository<Articles>,
  ) {}

  findAll(params: any = {}): Promise<Articles[]> {
    return this.repository.findAll();
  }
}
