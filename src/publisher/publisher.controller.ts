import { Controller, Post, Body } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Controller('/publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  createPublisher(@Body() createPublisherDto: CreatePublisherDto): Promise<CreatePublisherDto> {
    return this.publisherService.createPublisher(createPublisherDto);
  }
}
