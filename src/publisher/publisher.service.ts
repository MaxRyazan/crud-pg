import { HttpException, Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@/secret-variables';
import { CreatePublisherResponse } from '@/publisher/types/createPublisherResponse';
import { LoginPublisherDto } from '@/publisher/dto/login-publisher.dto';
import { compare } from 'bcrypt';

@Injectable()
export class PublisherService {

  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepo: Repository<Publisher>) {}

  async createPublisher(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    const existing: Publisher = await this.publisherRepo.findOne({where: {email: createPublisherDto.email}})
    if(existing) {
      throw new HttpException('This email already taken!', 400)
    }
    const publisher: Publisher = new Publisher();
    Object.assign(publisher, createPublisherDto);
    return await this.publisherRepo.save(publisher)
  }

  async login(loginDto: LoginPublisherDto): Promise<Publisher>{
    const publisher: Publisher = await this.publisherRepo.findOne({where: {email: loginDto.email}})
    if(!publisher) {
      throw new HttpException('Wrong credentials!', 404)
    }
    const isPasswordCompare = await compare(loginDto.password, publisher.password)
    if(!isPasswordCompare) {
      throw new HttpException('Wrong credentials!', 404)
    }
    return publisher;
  }


  async findById(id: number): Promise<Publisher> {
    return await this.publisherRepo.findOne({where: {id: id}, select: {
        id: true,
        username: true,
        email: true,
        password: false
      }})
  }



  generateToken(publisher: Publisher): string {
    return sign({
      id: publisher.id,
      username: publisher.username,
      email: publisher.email
    }, JWT_SECRET)
  }

  createPublisherResponse(publisher: Publisher): CreatePublisherResponse {
    return {
      id: publisher.id,
      email: publisher.email,
      username: publisher.username,
      token: this.generateToken(publisher)
    }
  }
}
