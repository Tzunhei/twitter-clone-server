import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';

@EntityRepository(Hashtag)
export class HashtagRepository extends Repository<Hashtag> {
  async findHashtagById(hashtagId: string) {
    try {
      return await this.findOne(hashtagId);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findHashtagByTag(tag: string) {
    try {
      return await this.findOne({ where: { tag } });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async saveHashtag(tag: string) {
    try {
      const hashtag = this.create({ tag });
      return await this.save(hashtag);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async saveHashtags(hashtags: string[]) {
    try {
      const tags = hashtags.map((h) => this.create({ tag: h }));
      return await this.save(tags);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteHashtag(hashtag: Hashtag) {
    try {
      return await this.delete(hashtag);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
