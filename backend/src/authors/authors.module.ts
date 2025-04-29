import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Authors } from './entities/authors.entity';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Authors])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
