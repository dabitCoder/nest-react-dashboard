import { IsNumber } from 'class-validator';

export class CreateSummaryDto {
  @IsNumber()
  articleId: number;
}
