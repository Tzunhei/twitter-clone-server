import { BadRequestException, Injectable } from '@nestjs/common';
import { HashtagsService } from '../hashtags/hashtags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SearchService {
  constructor(
    private hashtagsService: HashtagsService,
    private usersService: UsersService,
  ) {}

  async search(search: string) {
    const hashtags = await this.hashtagsService.searchHashtags(search);
    const users = await this.usersService.searchUsers(search);
    if (!hashtags.length && !users.length) {
      throw new BadRequestException(`No results for ${search}`);
    }
    return [{ hashtags }, { users }];
  }
}
