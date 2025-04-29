import { Injectable, NotFoundException } from '@nestjs/common';
import { Articles } from './entities/articles.entity';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery, FindOptions } from '@mikro-orm/mariadb';
import { FindArticlesDto } from './dto/find-articles.dto';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { FindAllResponse, StatsResponse } from './types';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly repository: EntityRepository<Articles>,
  ) {}

  async findAll(params: FindArticlesDto = {}): Promise<FindAllResponse> {
    const where: FilterQuery<Articles> = this.buildWhereQuery(params);
    const orderBy = this.buildSortingQuery(params);
    const options: FindOptions<Articles> = {
      orderBy,
    };

    if (params?.page && params?.limit) {
      options.limit = params.limit;
      options.offset = (params.page - 1) * params.limit;
    }

    const [data, total] = await this.repository.findAndCount(where, {
      ...options,
      populate: ['author'],
    });

    return { data, total };
  }

  async findMostViewedAndSharedArticles(
    params: Partial<FindArticlesDto> = {},
  ): Promise<StatsResponse> {
    const withAuthorFilter = params.authorId ? true : undefined;

    const [mostViewed, mostShared] = await Promise.all([
      this.repository.find(
        withAuthorFilter ? { author: +params.authorId } : {},
        { orderBy: { views: 'DESC' }, limit: 1, populate: ['author'] },
      ),
      this.repository.find(
        withAuthorFilter ? { author: +params.authorId } : {},
        { orderBy: { shares: 'DESC' }, limit: 1, populate: ['author'] },
      ),
    ]);

    return { mostViewed, mostShared };
  }

  private buildWhereQuery(params: FindArticlesDto = {}): FilterQuery<Articles> {
    const where: FilterQuery<Articles> = {};

    this.buildAuthorFilter(params, where);
    this.buildSearchQuery(params, where);

    return where;
  }

  async createSummary(params: CreateSummaryDto): Promise<{ summary: string }> {
    const article = await this.repository.findOne(
      { id: params.articleId },
      { populate: ['author'] },
    );

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return { summary: article.summary };
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
    if (params?.authorId) {
      where['author'] = params.authorId;
    }
  }
}
