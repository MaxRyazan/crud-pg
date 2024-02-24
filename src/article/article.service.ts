import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Publisher } from '@entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '@entities/article.entity';
import { CPagination, Filters } from '@/article/types/custom-pagination';
import { PaginationResponse } from '@/article/types/pagination-response';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}


  async create(createArticleDto: CreateArticleDto, publisher: Publisher) {
    const newArticle = {
      ...createArticleDto,
      author: publisher.id
    }
    return await this.articleRepo.save(newArticle);
  }

  async readArticle(id: number): Promise<Article> {
    const articleFromDb: Article = await this.articleRepo.findOne({where: {id: id}})
    if(!articleFromDb) {
      throw new NotFoundException('Article not found')
    }
    return articleFromDb;
  }


  async deleteArticle(id: number) {
    const articleFromDb: Article = await this.articleRepo.findOne({where: {id: id}})
    if(!articleFromDb) {
      throw new NotFoundException('Article for delete was not found')
    }
    await this.cacheManager.reset();
    return await this.articleRepo.delete({ id: id })
  }


  async updateArticle(id: number, newData: UpdateArticleDto) {
    const articleFromDb: Article = await this.articleRepo.findOne({where: {id: id}})
    if(!articleFromDb) {
      throw new NotFoundException('Article for update was not found')
    }
    await this.cacheManager.reset();
    return await this.articleRepo.update({ id: id }, {
      ...newData
    })
  }


  async findAllOrFilter(options:{filters?: Filters[], limit?: number, page?: number}): Promise<PaginationResponse> {
    if(!options.filters.length) {
      const [result, total] = await this.articleRepo.findAndCount({
        take: options.limit,
        skip: options.limit * (options.page - 1)
      });
      return {
        data: result,
        count: total,
        totalPages: options.limit === 0 ? 1 : Math.ceil(total / options.limit)
      }
    }

    const [result, total] = await this.articleRepo.findAndCount({
      where: this.createSearchOptions(options.filters),
      take: options.limit,
      skip: options.limit * (options.page - 1)
    })

    return {
      data: result,
      count: total,
      totalPages: options.limit === 0 ? 1 : Math.ceil(total / options.limit)
    }
  }

  createOptions(query: string[]):CPagination {
    let options: CPagination = {
      filters: [],
      limit: 10,
      page: 1,
    }
    const filterBy: string[] = Object.keys(query);
    filterBy.forEach((el: string) => {
      if(el === 'limit') {
        options.limit = Math.abs(parseInt(query[el]));
      }
      if(el === 'page') {
        options.page = Math.abs(parseInt(query[el]));
      }
      if(el !== 'limit' && el !== 'page') {
        options.filters.push({
            filterName: el,
            filterParam: query[el]
          })
      }
    })
    return options
  }

  createSearchOptions(filters: Filters[]) {
    let searchOptions = {}

    for (let i = 0; i <filters.length; i++) {
      searchOptions[filters[i]['filterName']] = filters[i]['filterParam'];
    }
    return searchOptions
  }
}
