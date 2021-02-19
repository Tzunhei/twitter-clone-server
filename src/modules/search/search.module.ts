import { Module } from '@nestjs/common';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { UsersModule } from '../users/users.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [HashtagsModule, UsersModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
