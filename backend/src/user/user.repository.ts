import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundException } from './exceptions/userNotFound.exception';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
  async delete(id: string): Promise<void> {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
  }
  async update(user: User): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }
}
