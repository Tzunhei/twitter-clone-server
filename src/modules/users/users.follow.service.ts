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
    await this.getRepository().incrementFollowCount(user.id, 'nb_following');
    await this.getRepository().incrementFollowCount(follow.id, 'nb_followers');
    return this.getRepository().followUser(user, follow);
  }

  async unfollowUser(userId: string, followId: string) {
    const user = await this.usersService.findUserById(userId);
    const follow = await this.usersService.findUserById(followId);
    await this.getRepository().decrementFollowCount(user.id, 'nb_following');
    await this.getRepository().decrementFollowCount(follow.id, 'nb_followers');
    return this.getRepository().unfollowUser(user, follow.id);
  }
}
