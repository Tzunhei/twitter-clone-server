import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  getRepository() {
    return getCustomRepository(UserRepository);
  }

  signUp(createUserDto: CreateUserDto) {
    return this.getRepository().createUser(createUserDto);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.getRepository().updateUser(id, updateUserDto);
  }

  deleteUser(id: string) {
    return this.getRepository().deleteUser(id);
  }
}
