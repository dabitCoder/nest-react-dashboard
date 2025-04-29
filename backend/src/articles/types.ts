import { Articles } from './entities/articles.entity';

export interface FindAllResponse {
  data: Array<Articles>;
  total: number;
}

export interface StatsResponse {
  mostViewed: Articles[] | null;
  mostShared: Articles[] | null;
}
