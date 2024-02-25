import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Название статьи',
    examples: ['Разберем потрошки?'],
  })
  name: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Описание статьи',
    examples: ['Статья о том, как выглядят потрошки Vue3js.'],
  })
  description: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Текст статьи',
    examples: ['Тут должен быть текст статьи'],
  })
  articleBody: string
}
