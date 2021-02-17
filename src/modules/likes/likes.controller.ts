import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../auth/getUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUserClaims } from '../auth/jwtClaims.interface';
import { LikesService } from './likes.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Get()
  getUserLikes(@GetUser() user: JwtUserClaims) {
    return this.likesService.getUserLikedTweets(user.userId);
  }

  @Post(':id')
  likeTweet(@Param('id') tweetId: string, @GetUser() user: JwtUserClaims) {
    return this.likesService.likeTweet(tweetId, user.userId);
  }

  @Delete(':id')
  unlikeTweet(@Param('id') tweetId: string, @GetUser() user: JwtUserClaims) {
    return this.likesService.unlikeTweet(tweetId, user.userId);
  }
}
