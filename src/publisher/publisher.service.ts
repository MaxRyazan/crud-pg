import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublisherService {

  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepo: Repository<Publisher>) {}

  async createPublisher(createPublisherDto: CreatePublisherDto): Promise<CreatePublisherDto> {
    const publisher: Publisher = new Publisher();
    Object.assign(publisher, createPublisherDto);
    return await this.publisherRepo.save(publisher)
  }
}
