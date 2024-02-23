import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Publisher } from '@entities/publisher.entity';
import { PublisherService } from '@/publisher/publisher.service';
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

}
