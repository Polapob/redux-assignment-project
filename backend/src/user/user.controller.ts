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
import { Request } from 'express';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { IAuthRequest } from 'src/auth/auth.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: IAuthRequest,
  ): Promise<User> {
    console.log('email =', req.userEmail);
    console.log('id =', req.userId);
    return await this.userService.findOne(id);
  }

  @Post('create')
  async create(
    @Body(new ValidationPipe()) userDTO: CreateUserDTO,
  ): Promise<User> {
    return await this.userService.create(userDTO);
  }

  @Delete('')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Patch('update')
  async update(
    @Param('id') id: string,
    @Body() userDTO: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.update(id, userDTO);
  }
}
