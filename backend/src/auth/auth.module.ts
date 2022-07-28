import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisCacheModule } from 'src/redis/redis.module';
import { RedisCacheService } from 'src/redis/redis.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    RedisCacheModule,
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  providers: [PrismaService, AuthRepository, RedisCacheService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
