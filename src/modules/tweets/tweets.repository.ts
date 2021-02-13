import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Tweet } from './tweet.entity';

@EntityRepository(Tweet)
export class TweetRepository extends Repository<Tweet> {
  async findTweetsByUserId(user: User) {
    try {
      return await this.find({ where: { user }, relations: ['user'] });
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
}
