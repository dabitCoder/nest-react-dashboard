import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { FindArticlesDto } from './dto/find-articles.dto';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { FindAllResponse } from './types';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(params: FindArticlesDto): Promise<FindAllResponse> {
    return this.articlesService.findAll(params);
  }

  /**
   * I choose post because in a "real world scenario" this will include some processing
   * of the article (title or content). For a test like this a GET is more than enough
   * but I think is good to show how I would do this on o production environment
   */
  @Post('/summary')
  createSummary(@Body() params: CreateSummaryDto): Promise<string> {
    return this.articlesService.createSummary(params);
  }
}
