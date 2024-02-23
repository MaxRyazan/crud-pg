import { Controller, Post, Body, UseGuards, Get, Param, Delete, Patch, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetPublisher } from '@/publisher/decorators/publisher.decorator';
import { Publisher } from '@entities/publisher.entity';
import { AuthorizationGuard } from '@/publisher/guards/authorization.guard';
import { Article } from '@entities/article.entity';
import { UpdateArticleDto } from '@/article/dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}


  @Get('/')
  async getAllArticles(@Query() query: any): Promise<{data: Article[], count: number}> {
    const filterBy: string = Object.keys(query)[0];
    return await this.articleService.findAllOrFilter(filterBy, query[filterBy])
  }

  @Post('/new')
  @UseGuards(AuthorizationGuard)
  create(@Body() createArticleDto: CreateArticleDto, @GetPublisher() publisher: Publisher) {
    return this.articleService.create(createArticleDto, publisher);
  }

  @Get('/:id')
  readArticle(@Param() params: {id: string}): Promise<Article> {
    return this.articleService.readArticle(parseInt(params.id))
  }


  @Delete('/:id')
  @UseGuards(AuthorizationGuard)
  async deleteArticle(@Param() params: {id: string}) {
    return await this.articleService.deleteArticle(parseInt(params.id))
  }

  @Patch('/:id')
  @UseGuards(AuthorizationGuard)
  async updateArticle(@Param() params: {id: string}, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.updateArticle(parseInt(params.id), updateArticleDto)
  }
}
