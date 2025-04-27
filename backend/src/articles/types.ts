import { Articles } from './entities/articles.entity';

export interface FindAllResponse {
  data: Array<Articles>;
  total: number;
}
