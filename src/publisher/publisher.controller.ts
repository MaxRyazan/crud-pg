import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { CreatePublisherResponse } from '@/publisher/types/createPublisherResponse';
import { LoginPublisherDto } from '@/publisher/dto/login-publisher.dto';

@Controller('/publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createPublisher(@Body() createPublisherDto: CreatePublisherDto): Promise<CreatePublisherResponse> {
    const publisher: Publisher = await this.publisherService.createPublisher(createPublisherDto);
    return this.publisherService.createPublisherResponse(publisher)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginPublisherDto): Promise<CreatePublisherResponse> {
    const publisher: Publisher = await this.publisherService.login(loginDto);
    return this.publisherService.createPublisherResponse(publisher)
  }
}
