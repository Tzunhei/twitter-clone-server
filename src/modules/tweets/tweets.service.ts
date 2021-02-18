import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { getCustomRepository } from 'typeorm';
import { HashtagsService } from '../hashtags/hashtags.service';
import { FollowService } from '../users/users.follow.service';
import { UsersService } from '../users/users.service';
import { TweetRepository } from './tweets.repository';

@Injectable()
export class TweetsService {
  constructor(
    private usersService: UsersService,
    private followService: FollowService,
    private hashtagsService: HashtagsService,
  ) {}

  private getRepository() {
    return getCustomRepository(TweetRepository);
  }

  async getTweetsFeed(userId: string, paginationDto: PaginationDto) {
    const user = await this.usersService.findUserById(userId);
    const followings = await this.followService.getUserFollowings(userId);
    return await this.getRepository().findTweetsByUserIds(
      [user, ...followings],
      paginationDto.limit,
      paginationDto.offset,
    );
  }

  async findTweetById(tweetId: string) {
    return this.getRepository().findTweetById(tweetId);
  }

  async findTweetsByUserId(userId: string) {
    const user = await this.usersService.findUserById(userId);
    return this.getRepository().findTweetsByUserId(user);
  }

  async postTweet(userId: string, post: string) {
    const user = await this.usersService.findUserById(userId);
    const hashtags = await this.hashtagsService.extractAndSaveHashtags(post);
    return this.getRepository().createTweet(user, post, hashtags);
  }

  async deleteTweet(id: string) {
    return this.getRepository().deleteTweet(id);
  }

  async incrementLikesCounter(tweetId: string) {
    return this.getRepository().incrementCount(tweetId, 'likes');
  }

  async decrementLikesCounter(tweetId: string) {
    return this.getRepository().decrementCount(tweetId, 'likes');
  }
}
