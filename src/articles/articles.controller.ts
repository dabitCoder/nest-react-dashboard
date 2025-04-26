import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './entities/articles.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(params: any): Promise<Articles[]> {
    return this.articlesService.findAll(params);
  }
}
