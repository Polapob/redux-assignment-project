import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateStoreDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;
}
