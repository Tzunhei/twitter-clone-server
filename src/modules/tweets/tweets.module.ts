import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { HashtagsModule } from '../hashtags/hashtags.module';

@Module({
  imports: [AuthModule, UsersModule, HashtagsModule],
  providers: [TweetsService],
  controllers: [TweetsController],
  exports: [TweetsService],
})
export class TweetsModule {}
