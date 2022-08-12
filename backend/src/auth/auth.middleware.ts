import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { createClient } from 'redis';
import redisService from 'src/redis/redis.service';
import { IAuthRequest } from './auth.type';
import { UserUnauthorizeException } from './exceptions/userUnauthorized.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: IAuthRequest, _: Response, next: NextFunction) {
    const { sessionId } = req.cookies;
    const { id, email } = JSON.parse(await redisService.get(sessionId)) as {
      id: string;
      email: string;
    };

    if (!id || !email) {
      throw new UserUnauthorizeException();
    }
    req.userId = id;
    req.userEmail = email;
    next();
  }
}
