import { IsEmail, IsNotEmpty, NotContains } from 'class-validator';
import { Unique } from 'typeorm';

export class CreatePublisherDto {
  @IsNotEmpty()
  @NotContains(' ')
  readonly username: string;

  @IsEmail()
  @NotContains(' ')
  readonly email: string;

  @IsNotEmpty()
  @NotContains(' ')
  readonly password: string;
}
