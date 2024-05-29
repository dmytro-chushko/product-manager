import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserResponse } from 'src/types';
import { ExceptionMessage } from 'src/utils/consts';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async removeById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(ExceptionMessage.NOT_FOUND);
    }

    return await this.userRepository.remove(user);
  }

  async getAllUsers(): Promise<IUserResponse[]> {
    const users = await this.findAll();
    const modifiedUserData = users.map(user => ({
      id: user.id,
      email: user.email,
    }));

    return modifiedUserData;
  }
}
