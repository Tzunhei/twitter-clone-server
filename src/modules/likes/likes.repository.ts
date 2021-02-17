import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';
import { User } from '../users/user.entity';
import { Like } from './like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async getUserLikes(user: User) {
    try {
      return await this.find({
        where: { user },
        relations: ['tweet', 'tweet.user'],
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async addLike(tweet: Tweet, user: User) {
    try {
      await this.insert({ tweet, user });
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async removeLike(tweet: Tweet, user: User) {
    try {
      await this.delete({ tweet, user });
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
