import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Название статьи',
    examples: ['Разберем потрошки?'],
  })
  readonly name: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Описание статьи',
    examples: ['Статья о том, как выглядят потрошки Vue3js.'],
  })
  readonly description: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Текст статьи',
    examples: ['Тут должен быть текст статьи'],
  })
  readonly articleBody: string

}
