import { Injectable } from '@nestjs/common';
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
    return [{ hashtags }, { users }];
  }
}
