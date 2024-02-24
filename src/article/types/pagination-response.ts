import { Article } from '@entities/article.entity';

export interface PaginationResponse {
  data: Article[],
  count: number,
  totalPages: number
}