import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Articles } from './entities/articles.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Articles])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
