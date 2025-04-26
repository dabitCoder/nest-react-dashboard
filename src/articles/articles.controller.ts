import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './entities/articles.entity';
import { FindArticlesDto } from './dto/find-articles.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(params: FindArticlesDto): Promise<Articles[]> {
    return this.articlesService.findAll(params);
  }
}
