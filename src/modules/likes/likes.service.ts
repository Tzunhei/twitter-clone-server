import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { TweetsService } from '../tweets/tweets.service';
import { UsersService } from '../users/users.service';
import { LikeRepository } from './likes.repository';

@Injectable()
export class LikesService {
  constructor(
    private tweetsService: TweetsService,
    private userService: UsersService,
  ) {}

  private getRepository() {
    return getCustomRepository(LikeRepository);
  }

  async getUserLikedTweets(userId: string) {
    const user = await this.userService.findUserById(userId);
    const likes = await this.getRepository().getUserLikes(user);
    const likedTweets = likes.map((l) => l.tweet);
    return likedTweets;
  }

  async likeTweet(tweetId: string, userId: string) {
    await this.tweetsService.incrementLikesCounter(tweetId);
    const tweet = await this.tweetsService.findTweetById(tweetId);
    const user = await this.userService.findUserById(userId);
    return await this.getRepository().addLike(tweet, user);
  }

  async unlikeTweet(tweetId: string, userId: string) {
    await this.tweetsService.decrementLikesCounter(tweetId);
    const tweet = await this.tweetsService.findTweetById(tweetId);
    const user = await this.userService.findUserById(userId);
    return await this.getRepository().removeLike(tweet, user);
  }
}
