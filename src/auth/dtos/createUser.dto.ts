import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { User } from '../../users/user.interface';

export class CreateUserDto implements User {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
