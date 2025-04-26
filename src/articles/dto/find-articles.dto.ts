import { IsOptional, IsString, IsEnum } from 'class-validator';

enum SortBy {
  VIEWS = 'views',
  SHARES = 'shares',
}

export class FindArticlesDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}
