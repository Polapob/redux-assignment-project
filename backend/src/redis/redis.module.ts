import { Module } from '@nestjs/common';

import { RedisCacheService } from './redis.service';

@Module({
  providers: [RedisCacheService],
  exports: [RedisModule, RedisCacheService],
})
export class RedisModule {}
