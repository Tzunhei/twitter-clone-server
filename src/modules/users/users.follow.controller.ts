import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../auth/getUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUserClaims } from '../auth/jwtClaims.interface';
import { FollowService } from './users.follow.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('users/follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  followUser(@GetUser() user: JwtUserClaims, @Param() followId: string) {
    return this.followService.followUser(user.userId, followId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  unfollowUser(@GetUser() user: JwtUserClaims, @Param() followId: string) {
    return this.followService.unfollowUser(user.userId, followId);
  }
}
