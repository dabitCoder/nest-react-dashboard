import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum SortBy {
  VIEWS = 'views',
  SHARES = 'shares',
}

export class FindArticlesDto {
  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 25;
}
