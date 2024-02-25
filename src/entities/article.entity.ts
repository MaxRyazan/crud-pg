import { Publisher } from '../entities/publisher.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'articles'})
export class Article {

  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
    description: 'Автогенерируемый id статьи',
    examples: [1, 2, 3],
  })
  id: number;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Название статьи',
    examples: ['Разберем потрошки?'],
  })
  name: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Описание статьи',
    examples: ['Статья о том, как выглядят потрошки Vue3js.'],
  })
  description: string;

  @Column({name: 'article_body'})
  @ApiProperty({
    type: String,
    description: 'Текст статьи',
    examples: ['Тут должен быть текст статьи'],
  })
  articleBody: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  @ApiProperty({
    type: String,
    description: 'Автогенерируемое значение timestamp в UTC',
    examples: ['2024-02-25T10:03:34.599Z'],
  })
  created_at: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.articles)
  @ApiProperty({
    type: Number,
    description: 'Автогенерируемое id публициста',
    examples: [1, 2, 3],
  })
  @Column({name: 'authorId'})
  authorId: number

}
