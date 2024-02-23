import { Controller, Post, Body } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { CreatePublisherResponse } from '@/publisher/types/createPublisherResponse';

@Controller('/publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  async createPublisher(@Body() createPublisherDto: CreatePublisherDto): Promise<CreatePublisherResponse> {
    const publisher: Publisher = await this.publisherService.createPublisher(createPublisherDto);
    return this.publisherService.createPublisherResponse(publisher)
  }
}
