import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getByUsername(name: string) {
    const user = await this.usersRepository.findOne({ where: { name } });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async create(userData: User) {
    const newUser = await this.usersRepository.create(userData);
    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(null, 'User already exists');
      }
    }
    return newUser;
  }
}
