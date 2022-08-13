import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsMongoId,
} from 'class-validator';

export class CreateStoreDTO {
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
