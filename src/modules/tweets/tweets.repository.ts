import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Tweet } from './tweet.entity';

type TweetCounts = 'likes' | 'replies' | 'retweets';
@EntityRepository(Tweet)
export class TweetRepository extends Repository<Tweet> {
  async findTweetsByUserId(user: User) {
    try {
      return await this.find({ where: { user }, relations: ['user'] });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findTweetById(tweetId: string) {
    try {
      return await this.findOne(tweetId);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findTweetsByUserIds(users: User[], limit?: number, offset?: number) {
    try {
      const whereUserIds = users.map((val) => ({ user: { id: val.id } }));
      return await this.find({
        where: whereUserIds,
        relations: ['user'],
        order: {
          createdAt: 'DESC',
        },
        take: limit,
        skip: offset,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createTweet(user: User, post: string) {
    try {
      const tweet = this.create({ user, post });
      await this.save(tweet);
      return await this.findOne(tweet.id, { relations: ['user'] });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteTweet(id: string) {
    try {
      await this.delete(id);
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async incrementCount(tweetId: string, column: TweetCounts) {
    try {
      await this.increment({ id: tweetId }, column, 1);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async decrementCount(tweetId: string, column: TweetCounts) {
    try {
      await this.decrement({ id: tweetId }, column, 1);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
