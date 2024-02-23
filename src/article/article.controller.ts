import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetPublisher } from '@/publisher/decorators/publisher.decorator';
import { Publisher } from '@entities/publisher.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/new')
  create(@Body() createArticleDto: CreateArticleDto, @GetPublisher() publisher: Publisher) {
    console.log("publisher", publisher);
    return this.articleService.create(createArticleDto);
  }

  // @Get()
  // findAll() {
  //   return this.articleService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.articleService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articleService.remove(+id);
  // }
}
