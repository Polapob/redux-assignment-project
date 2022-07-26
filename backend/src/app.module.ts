import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { RedisModule } from './redis/redis.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, RedisModule, StoreModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
