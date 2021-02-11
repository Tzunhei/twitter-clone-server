import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  getRepository() {
    return getCustomRepository(UserRepository);
  }

  signUp(createUserDto: CreateUserDto) {
    return this.getRepository().createUser(createUserDto);
  }
}
