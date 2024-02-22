import { Article } from '@entities/article.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {hash} from 'bcrypt'

@Entity({name: 'publishers'})
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

  @BeforeInsert()
  async hashPassword(){
    this.password = await hash(this.password, 10)
  }
}
