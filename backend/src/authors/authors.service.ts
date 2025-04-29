import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/mariadb';
import { Authors } from './entities/authors.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Authors)
    private readonly repository: EntityRepository<Authors>,
  ) {}

  findAll() {
    return this.repository.findAll();
  }
}
