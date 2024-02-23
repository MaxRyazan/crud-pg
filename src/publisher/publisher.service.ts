import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from '@entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
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
    publisher.refreshToken = this.generateToken(publisher, 60 * 60 * 24 * 7);
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
        password: false,
        refreshToken: true
      }})
  }


  generateToken(publisher: Publisher, expires: number): string {
    return sign({
      id: publisher.id,
      username: publisher.username,
      email: publisher.email
    }, JWT_SECRET, {expiresIn: expires})
  }

  createPublisherResponse(publisher: Publisher): CreatePublisherResponse {
    return {
      id: publisher.id,
      email: publisher.email,
      username: publisher.username,
      refreshToken: publisher.refreshToken,
      token: this.generateToken(publisher, 60*60*24)
    }
  }

  async refreshTokens(publisher: Publisher, refreshTokenFromCurrentUser: string): Promise<{refreshToken: string, accessToken: string}> {
    if(publisher.refreshToken === refreshTokenFromCurrentUser) {
      const newRefresh: string = this.generateToken(publisher, 60*60*24*7)
      const newAccessToken: string = this.generateToken(publisher, 60*60*24)
      await this.publisherRepo.update(publisher.id, {refreshToken: newRefresh})
      return {
        refreshToken: newRefresh,
        accessToken: newAccessToken,
      }
    }
    throw new BadRequestException('Wrong refresh token')
  }
}
