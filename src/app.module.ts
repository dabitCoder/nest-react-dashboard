import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticlesModule } from './articles/articles.module';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), ArticlesModule],
})
export class AppModule {}
