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
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import any = jasmine.any;

@ApiTags('Article')
@UseInterceptors(CacheInterceptor)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}


  @Get('/all')
  @ApiOperation({ summary: 'Получение всех статей' })
  @ApiResponse({ status: 200, type: [Article] })
  @ApiQuery({name: 'page', description: 'Номер страницы при пагинации', required: false, example: 1})
  @ApiQuery({name: 'limit', description: 'Лимит вывода результатов на каждой страницы', required: false, example: 10})
  @ApiQuery({name: 'name', description: 'Фильтр по имени', required: false, example: 'article1'})
  @ApiQuery({name: 'authorId', description: 'Фильтр по публицисту', required: false, example: 1})
  async getAllArticles(@Query() query: any): Promise<PaginationResponse> {
    const options: CPagination = this.articleService.createOptions(query);
    return await this.articleService.findAllOrFilter(options)
  }

  @Post('/new')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Создание статьи' })
  @ApiResponse({ status: 201, type: Article })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение статьи по id' })
  @ApiResponse({ status: 200, type: Article })
  @ApiParam({name: 'id', description: 'id статьи', required: false, example: 1})
  readArticle(@Param() params: {id: string}): Promise<Article> {
    return this.articleService.readArticle(parseInt(params.id))
  }


  @Delete('/:id')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Удаление статьи по id' })
  @ApiParam({name: 'id', description: 'id статьи', required: false, example: 1})
  @ApiResponse({ status: 200 })
  async deleteArticle(@Param() params: {id: string}) {
    return await this.articleService.deleteArticle(parseInt(params.id))
  }

  @Patch('/:id')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Изменение статьи по id' })
  @ApiParam({name: 'id', description: 'id статьи', required: false, example: 1})
  @ApiResponse({ status: 200 })
  async updateArticle(@Param() params: {id: string}, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.updateArticle(parseInt(params.id), updateArticleDto)
  }
}
