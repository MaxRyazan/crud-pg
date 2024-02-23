import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  articleBody: string
}
