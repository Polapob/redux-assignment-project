import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { RedisModule } from 'src/redis/redis.module';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';

@Module({
  imports: [RedisModule],
  providers: [StoreRepository, StoreService],
  controllers: [StoreController],
})
export class StoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'store/:id', method: RequestMethod.GET });
  }
}
