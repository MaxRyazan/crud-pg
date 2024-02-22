import { Article } from '@entities/article.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Publisher {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[]

}
