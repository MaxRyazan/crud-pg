import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { CreatePublisherResponse } from '@/publisher/types/createPublisherResponse';
import { LoginPublisherDto } from '@/publisher/dto/login-publisher.dto';
import { GetPublisher } from '@/publisher/decorators/publisher.decorator';
import { GetRefreshTokenDecorator } from '@/publisher/decorators/getRefreshToken.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Article } from '@entities/article.entity';
import { HeaderObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@ApiTags('Publisher')
@Controller('/publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post('/new')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создание публициста' })
  @ApiResponse({ status: 201, type: Publisher })
  async createPublisher(@Body() createPublisherDto: CreatePublisherDto): Promise<CreatePublisherResponse> {
    const publisher: Publisher = await this.publisherService.createPublisher(createPublisherDto);
    return this.publisherService.createPublisherResponse(publisher)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Аутентификация по почте и паролю' })
  @ApiResponse({ status: 200 })
  async login(@Body() loginDto: LoginPublisherDto): Promise<CreatePublisherResponse> {
    const publisher: Publisher = await this.publisherService.login(loginDto);
    return this.publisherService.createPublisherResponse(publisher)
  }


  @Post('/refresh-tokens')
  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({ content: undefined, status: 200, type: [String]})
  async refreshTokens(@GetPublisher() publisher: Publisher, @GetRefreshTokenDecorator() refreshTokenFromCurrentUser: string) {
    return this.publisherService.refreshTokens(publisher, refreshTokenFromCurrentUser);
  }
}
