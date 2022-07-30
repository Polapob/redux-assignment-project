import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisCacheModule } from 'src/redis/redis.module';
import { RedisCacheService } from 'src/redis/redis.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [RedisCacheModule, CacheModule.register({ ttl: 5, max: 10 })],
  providers: [PrismaService, UserRepository, UserService, RedisCacheService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
