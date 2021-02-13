import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Injectable()
export class FollowService {
  constructor(private usersService: UsersService) {}

  getRepository() {
    return getCustomRepository(UserRepository);
  }

  async followUser(userId: string, followId: string) {
    const user = await this.usersService.findUserById(userId);
    const follow = await this.usersService.findUserById(followId);
    return this.getRepository().followUser(user, follow);
  }
}
