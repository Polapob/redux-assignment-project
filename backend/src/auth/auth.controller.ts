import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/userLogin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.authService.register(createUserDTO);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() userLoginDTO: UserLoginDTO,
    @Res() response: Response,
  ): Promise<{ sessionId: string }> {
    const { sessionId } = await this.authService.login(userLoginDTO);
    response.cookie('sessionId', sessionId);
    response.status(HttpStatus.ACCEPTED).json({
      sessionId,
    });
    return { sessionId };
  }

  @Post('logout')
  async logout(@Res() response: Response): Promise<void> {
    response.cookie('sessionId', '');
    response.status(HttpStatus.ACCEPTED).json({
      sessionId: '',
    });
  }
}
