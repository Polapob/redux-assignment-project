import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { ObjectID } from 'bson';
import { UserLoginDTO } from './dto/userLogin.dto';
import { EmailNotFoundException } from './exceptions/emailNotFound.exception';
import { PasswordMismatchException } from './exceptions/passwordMismastch.exception';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UserAlreadyCreateException } from './exceptions/userAlreadyCreate.exception';
import { now } from 'mongoose';
import { RedisCacheService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private redisCacheService: RedisCacheService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDTO: CreateUserDTO): Promise<User> {
    const { password, email, firstName, lastName, nickName, role } =
      createUserDTO;
    const findUser = !!(await this.authRepository.findByEmail(email));
    if (findUser) {
      throw new UserAlreadyCreateException();
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTORROUND));
    const hashPassword = await bcrypt.hash(password, salt);
    return this.authRepository.create({
      id: new ObjectID().toString(),
      email,
      firstName,
      lastName,
      nickName,
      role,
      password: hashPassword,
      createdAt: now(),
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
    const sessionId = uuidv4();

    await this.redisCacheService.set(
      sessionId,
      JSON.stringify({ id: fetchUser.id, email }),
    );

    return { sessionId };
  }

  async logout(sessionId: string): Promise<{ sessionId: string }> {
    await this.redisCacheService.del(sessionId);
    return { sessionId: '' };
  }
}
