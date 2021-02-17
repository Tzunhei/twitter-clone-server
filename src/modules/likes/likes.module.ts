import { Module } from '@nestjs/common';
import { TweetsModule } from '../tweets/tweets.module';
import { TweetsService } from '../tweets/tweets.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [TweetsModule, UsersModule],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
