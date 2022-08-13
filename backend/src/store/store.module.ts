import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisModule } from 'src/redis/redis.module';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';

@Module({
  imports: [RedisModule],
  providers: [PrismaService, StoreRepository, StoreService],
  controllers: [StoreController],
  exports: [StoreModule],
})
export class StoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/store/:id', method: RequestMethod.GET })
      .forRoutes(StoreController);
  }
}
