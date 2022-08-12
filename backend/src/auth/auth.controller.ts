import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto/userLogin.dto';
import { Response, Request } from 'express';
import { UserRegisterDTO } from './dto/userRegister.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe()) createUserDTO: UserRegisterDTO,
  ): Promise<Partial<User>> {
    const registerBody = await this.authService.register(createUserDTO);
    delete registerBody.password;
    return registerBody;
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) userLoginDTO: UserLoginDTO,
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
  async logout(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const { sessionId } = request.cookies;
    response.cookie('sessionId', '');
    await this.authService.logout(sessionId);
    response.status(HttpStatus.ACCEPTED).json({
      sessionId: '',
    });
  }
}
