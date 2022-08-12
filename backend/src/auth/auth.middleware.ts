import { Injectable, NestMiddleware, Next, Req } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { RedisCacheService } from 'src/redis/redis.service';
import { UserUnauthorizeException } from './exceptions/userUnauthorized.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async use(@Req() req: Request, @Next() next: NextFunction) {
    const { sessionId } = req.cookies;
    const sessionData = (await this.redisCacheService.get(sessionId)) as {
      id: string;
      email: string;
    };

    console.log('sessionData =', sessionData);

    if (!sessionData || !sessionData.id || !sessionData.email) {
      throw new UserUnauthorizeException();
    }

    next();
  }
}
