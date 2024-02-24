import { Publisher } from '../entities/publisher.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'articles'})
export class Article {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({name: 'article_body'})
  articleBody: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.articles)
  author: number

}
