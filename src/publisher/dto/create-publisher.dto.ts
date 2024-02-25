import { IsEmail, IsNotEmpty, NotContains } from 'class-validator';
import { Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublisherDto {
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: 'username публициста',
    example: 'cowboy3000',
  })
  readonly username: string;

  @IsEmail()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: 'email публициста',
    example: 'cowboy@gmail.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: 'Пароль аккаунта публициста',
    example: 'someHardPassword',
  })
  readonly password: string;
}
