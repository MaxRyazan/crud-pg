import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginPublisherDto {

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}