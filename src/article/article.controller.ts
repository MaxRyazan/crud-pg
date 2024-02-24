import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
  Patch,
  Query, UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetPublisher } from '@/publisher/decorators/publisher.decorator';
import { Publisher } from '@entities/publisher.entity';
import { AuthorizationGuard } from '@/publisher/guards/authorization.guard';
import { Article } from '@entities/article.entity';
import { UpdateArticleDto } from '@/article/dto/update-article.dto';
import { CPagination } from '@/article/types/custom-pagination';
import { PaginationResponse } from '@/article/types/pagination-response';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}


  @Get('/')
  async getAllArticles(@Query() query: any): Promise<PaginationResponse> {
    console.log('INSIDE CONTROLLER');
    const options: CPagination = this.articleService.createOptions(query);
    return await this.articleService.findAllOrFilter(options)
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
