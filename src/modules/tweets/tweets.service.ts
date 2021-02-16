import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { FollowService } from '../users/users.follow.service';
import { UsersService } from '../users/users.service';
import { TweetRepository } from './tweets.repository';

@Injectable()
export class TweetsService {
  constructor(
    private usersService: UsersService,
    private followService: FollowService,
  ) {}

  private getRepository() {
    return getCustomRepository(TweetRepository);
  }

  async getTweetsFeed(userId: string) {
    const user = await this.usersService.findUserById(userId);
    const followings = await this.followService.getUserFollowings(userId);
    return await this.getRepository().findTweetsByUserIds([
      user,
      ...followings,
    ]);
  }

  async findTweetsByUserId(userId: string) {
    const user = await this.usersService.findUserById(userId);
    return this.getRepository().findTweetsByUserId(user);
  }

  async postTweet(userId: string, post: string) {
    const user = await this.usersService.findUserById(userId);
    return this.getRepository().createTweet(user, post);
  }

  async deleteTweet(id: string) {
    return this.getRepository().deleteTweet(id);
  }
}
