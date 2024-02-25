import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPublisherDto {

  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'email публициста',
    example: 'cowboy@gmail.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Пароль аккаунта публициста',
    example: 'someHardPassword',
  })
  readonly password: string;
}