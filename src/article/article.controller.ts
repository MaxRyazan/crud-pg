import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetPublisher } from '@/publisher/decorators/publisher.decorator';
import { Publisher } from '@entities/publisher.entity';
import { AuthorizationGuard } from '@/publisher/guards/authorization.guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/new')
  @UseGuards(AuthorizationGuard)
  create(@Body() createArticleDto: CreateArticleDto, @GetPublisher() publisher: Publisher) {
    return this.articleService.create(createArticleDto, publisher);
  }

}
