import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { CreatePublisherResponse } from '@/publisher/types/createPublisherResponse';
import { LoginPublisherDto } from '@/publisher/dto/login-publisher.dto';
import { GetPublisher } from '@/publisher/decorators/publisher.decorator';
import { GetRefreshTokenDecorator } from '@/publisher/decorators/getRefreshToken.decorator';

@Controller('/publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post('/new')
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


  @Post('/refresh-tokens')
  async refreshTokens(@GetPublisher() publisher: Publisher, @GetRefreshTokenDecorator() refreshTokenFromCurrentUser: string) {
    return this.publisherService.refreshTokens(publisher, refreshTokenFromCurrentUser);
  }
}
