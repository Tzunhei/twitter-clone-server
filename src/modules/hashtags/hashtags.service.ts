import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { HashtagRepository } from './hashtags.repository';

@Injectable()
export class HashtagsService {
  private getRepository() {
    return getCustomRepository(HashtagRepository);
  }

  private extractHashtagsFromTweet(tweet: string) {
    return tweet.split(' ').filter((word) => word.startsWith('#'));
  }

  private async saveHashtags(tags: string[]) {
    return await this.getRepository().saveHashtags(tags);
  }

  async extractAndSaveHashtags(tweet: string) {
    const tags = this.extractHashtagsFromTweet(tweet);
    return await this.saveHashtags(tags);
  }

  async deleteHashtag(hashtagId: string) {
    const hashtag = await this.getRepository().findHashtagById(hashtagId);
    return await this.getRepository().deleteHashtag(hashtag);
  }
}
