import { Controller, Get } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Authors } from './entities/authors.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Promise<Authors[]> {
    return this.authorsService.findAll();
  }
}
