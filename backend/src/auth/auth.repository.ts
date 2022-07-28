import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(user: User) {
    return await this.prismaService.user.create({
      data: user,
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, user: User): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: user,
    });
  }
}
