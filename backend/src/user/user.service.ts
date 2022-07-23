import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { password, ...userDto } = createUserDTO;
    const hashPassword = await bcrypt.hash(password, process.env.SALTORROUND);
    return await this.userRepository.create({
      ...userDto,
      id: new ObjectId().toString(),
      password: hashPassword,
    });
  }
  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const getUser = await this.userRepository.findOne(id);
    return await this.userRepository.update(id, {
      id,
      email: getUser.email,
      password: getUser.password,
      firstName: updateUserDTO.firstName || getUser.firstName,
      lastName: updateUserDTO.lastName || getUser.lastName,
      nickName: updateUserDTO.nickName || getUser.nickName,
      role: updateUserDTO.role || getUser.role,
    });
  }
  async delete(id: string): Promise<void> {
    return await this.userRepository.delete(id);
  }
}
