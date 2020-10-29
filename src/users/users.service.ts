import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './user.entity';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
