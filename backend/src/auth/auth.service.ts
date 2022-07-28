import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { AuthRepository } from './auth.repository';
import bcrypt from 'bcrypt';
import { ObjectID } from 'bson';
import { RedisCacheService } from 'src/redis/redis.service';
import { UserLoginDTO } from './dto/userLogin.dto';
import { EmailNotFoundException } from './exceptions/emailNotFound.exception';
import { PasswordMismatchException } from './exceptions/passwordMismastch.exception';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { response } from 'express';
import { InvalidSessionException } from './exceptions/invalidSession.exception';
import { InvalidRefreshTokenException } from './exceptions/invalidRefreshToken.exception';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private redisCacheService: RedisCacheService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDTO: CreateUserDTO): Promise<User> {
    const { password, ...userDto } = createUserDTO;
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTORROUND));
    const hashPassword = await bcrypt.hash(password, salt);
    return this.authRepository.create({
      id: new ObjectID().toString(),
      password: hashPassword,
      ...userDto,
    });
  }

  async login(userLoginDTO: UserLoginDTO): Promise<{ sessionId: string }> {
    const { email, password } = userLoginDTO;
    const fetchUser = await this.authRepository.findByEmail(email);

    if (!fetchUser) {
      throw new EmailNotFoundException();
    }

    const validatePassword = await bcrypt.compare(password, fetchUser.password);

    if (!validatePassword) {
      throw new PasswordMismatchException();
    }

    const payload = { id: fetchUser.id, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '4h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    const sessionId = uuidv4();
    await this.redisCacheService.set(sessionId, { accessToken, refreshToken });
    response.cookie('sessionId', sessionId);

    return { sessionId };
  }

  async logout(): Promise<void> {
    response.cookie('sessionId', '');
    return;
  }

  async validateToken(sessionId: string): Promise<boolean> {
    const getToken = await this.redisCacheService.get(sessionId);

    if (!getToken) {
      // throw new InvalidSessionException();
      return false;
    }

    const { accessToken, refreshToken } = getToken as Record<
      'accessToken' | 'refreshToken',
      string
    >;

    const verifyRefreshToken = await this.jwtService.verifyAsync(refreshToken);

    if (!verifyRefreshToken) {
      // throw new InvalidRefreshTokenException();
      return false;
    }

    const verifyAccessToken = await this.jwtService.verifyAsync(accessToken);

    if (!verifyAccessToken) {
      const newAccessToken = await this.jwtService.signAsync(
        verifyRefreshToken,
        {
          expiresIn: '30d',
        },
      );
      await this.redisCacheService.set(sessionId, {
        refreshToken,
        accessToken: newAccessToken,
      });
      return true;
    }
    return true;
  }

  //register

  //login

  //logout

  //validateToken
}
