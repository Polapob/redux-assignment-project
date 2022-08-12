import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
