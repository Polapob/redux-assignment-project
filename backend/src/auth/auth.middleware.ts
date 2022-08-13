import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RedisCacheService } from 'src/redis/redis.service';
import { IAuthRequest } from './auth.type';
import { UserUnauthorizeException } from './exceptions/userUnauthorized.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private redisCacheService: RedisCacheService) {}
  async use(req: IAuthRequest, _: Response, next: NextFunction) {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      throw new UserUnauthorizeException();
    }
    const data = await this.redisCacheService.get(sessionId);
    if (!data) {
    }

    const { id, email } = JSON.parse(data) as {
      id: string;
      email: string;
    };

    req.userId = id;
    req.userEmail = email;
    next();
  }
}
