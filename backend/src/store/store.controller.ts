import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ObjectId } from 'bson';
import { Request } from 'express';
import { IAuthRequest } from 'src/auth/auth.type';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreateStoreDTO } from './dto/createStore.dto';
import { UpdateStoreDTO } from './dto/updateStore.dto';
import { InvalidIDException } from './exceptions/invalidID.exception';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) {
      throw new InvalidIDException();
    }
    return await this.storeService.get(id);
  }

  @Post('create')
  async createOne(
    @Body(new ValidationPipe()) createStoreDTO: CreateStoreDTO,
    @Req() request: IAuthRequest,
  ) {
    const { userId } = request;
    return await this.storeService.createOne(userId, createStoreDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: IAuthRequest) {
    if (!ObjectId.isValid(id)) {
      throw new InvalidIDException();
    }
    const { userId } = request;
    return await this.storeService.delete(id, userId);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateStoreDTO: UpdateStoreDTO,
    @Req() request: IAuthRequest,
  ) {
    const { userId } = request;
    const { name, address, phoneNumber } = updateStoreDTO;
    return await this.storeService.update(id, userId, {
      name,
      address,
      phoneNumber,
    });
  }
}
