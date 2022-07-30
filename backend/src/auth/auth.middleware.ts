import {
  HttpCode,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisCacheService } from 'src/redis/redis.service';
import { UserUnauthorizeException } from './exceptions/userUnauthorized.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const { sessionId } = req.cookies;
    const sessionData = (await this.redisCacheService.get(sessionId)) as {
      id: string;
      email: string;
    };

    if (!sessionData || !sessionData.id || !sessionData.email) {
      throw new UserUnauthorizeException();
    }

    next();
  }
}
