import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() userDTO: CreateUserDTO): Promise<User> {
    console.log('userDTO =', userDTO);
    return await this.userService.create(userDTO);
  }

  @Delete('')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userDTO: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.update(id, userDTO);
  }
}
