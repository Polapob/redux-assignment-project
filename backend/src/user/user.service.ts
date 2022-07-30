import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID Type', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.findOne(id);
  }
  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { password, email, ...userDto } = createUserDTO;
    if (this.userRepository.findByEmail(email)) {
      throw new HttpException(
        'This user already created!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTORROUND));
    const hashPassword = await bcrypt.hash(password, salt);
    return await this.userRepository.create({
      ...userDto,
      id: new ObjectId().toString(),
      email,
      password: hashPassword,
    });
  }
  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    if (!ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID Type', HttpStatus.BAD_REQUEST);
    }
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
    if (!ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID Type', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.delete(id);
  }
}
