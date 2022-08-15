import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStoreDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @IsOptional()
  @IsString()
  description: string;
}
