import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@/secret-variables';
import { CreatePublisherResponse } from '@/publisher/types/createPublisherResponse';

@Injectable()
export class PublisherService {

  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepo: Repository<Publisher>) {}

  async createPublisher(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    const publisher: Publisher = new Publisher();
    Object.assign(publisher, createPublisherDto);
    return await this.publisherRepo.save(publisher)
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
