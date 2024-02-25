import { Article } from '../entities/article.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {hash} from 'bcrypt'
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'publishers'})
export class Publisher {

  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
    description: 'Автогенерируемый id публициста',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    type: String,
    description: 'username публициста',
    example: 'cowboy3000',
  })
  username: string;

  @Column({unique: true})
  @ApiProperty({
    type: String,
    description: 'email публициста',
    example: 'cowboy@gmail.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Пароль аккаунта публициста',
    example: 'someHardPassword',
  })
  password: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Автогенерируемый refresh токен',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC',
  })
  refreshToken: string

  @OneToMany(() => Article, (article) => article.authorId)
  articles: Article[]

  @BeforeInsert()
  async hashPassword(){
    this.password = await hash(this.password, 10)
  }
}
