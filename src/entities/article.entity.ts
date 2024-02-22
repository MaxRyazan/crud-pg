import { Publisher } from '@entities/publisher.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'articles'})
export class Article {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.articles)
  author: Publisher

}
