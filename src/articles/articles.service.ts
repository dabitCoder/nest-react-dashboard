import { Injectable, NotFoundException } from '@nestjs/common';
import { Articles } from './entities/articles.entity';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery } from '@mikro-orm/mariadb';
import { FindArticlesDto } from './dto/find-articles.dto';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly repository: EntityRepository<Articles>,
  ) {}

  findAll(params: FindArticlesDto = {}): Promise<Articles[]> {
    const where: FilterQuery<Articles> = this.buildWhereQuery(params);
    const orderBy = this.buildSortingQuery(params);

    return this.repository.findAll({ where, orderBy });
  }

  private buildWhereQuery(params: FindArticlesDto = {}): FilterQuery<Articles> {
    const where: FilterQuery<Articles> = {};

    this.buildAuthorFilter(params, where);
    this.buildSearchQuery(params, where);

    return where;
  }

  async createSummary(params: CreateSummaryDto): Promise<string> {
    const article = await this.repository.findOne({ id: params.articleId });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article.summary;
  }

  private buildSearchQuery(
    params: FindArticlesDto,
    where: FilterQuery<any>,
  ): FilterQuery<Articles> {
    if (params?.searchTerm) {
      const search = params.searchTerm.trim();

      where.$or = [
        { title: { $like: `%${search}%` } },
        { content: { $like: `%${search}%` } },
      ];
    }

    return where;
  }

  private buildSortingQuery(params: FindArticlesDto): any {
    const orderBy: any = {};

    if (params?.sortBy) {
      orderBy[params.sortBy] = params.sortOrder ?? 'asc';
    }

    return orderBy;
  }

  private buildAuthorFilter(
    params: FindArticlesDto,
    where: FilterQuery<any>,
  ): any {
    if (params?.author) {
      where.author = params.author.toLowerCase();
    }
  }
}
