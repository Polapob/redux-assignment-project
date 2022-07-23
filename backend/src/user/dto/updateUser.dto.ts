import { Role } from '@prisma/client';
import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  nickName: string;

  @IsOptional()
  @IsEnum(Role, { each: true })
  role: Role;
}
