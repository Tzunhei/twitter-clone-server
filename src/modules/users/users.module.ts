import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FollowController } from './users.follow.controller';
import { FollowService } from './users.follow.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, FollowService],
  controllers: [UsersController, FollowController],
  exports: [UsersService, FollowService],
})
export class UsersModule {}
