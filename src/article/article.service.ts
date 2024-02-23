import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Publisher } from '@entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '@entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>) {}


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
    return await this.articleRepo.delete({ id: id })
  }


  async updateArticle(id: number, newData: UpdateArticleDto) {
    const articleFromDb: Article = await this.articleRepo.findOne({where: {id: id}})
    if(!articleFromDb) {
      throw new NotFoundException('Article for update was not found')
    }
    return await this.articleRepo.update({ id: id }, {
      ...newData
    })
  }


  async findAllOrFilter(filterName?: string, filterParam?: string): Promise<{data: Article[], count: number}> {
    if(!filterName || !filterParam) {
      const [result, total] = await this.articleRepo.findAndCount()
      return {
        data: result,
        count: total
      }
    }
    const [result, total] = await this.articleRepo.findAndCount({
      where: {
        [filterName]: filterParam
      }
    })
    return {
      data: result,
      count: total
    }
  }
}
