import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
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
import { PostTweetDto } from './tweets.dto';
import { TweetsService } from './tweets.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tweets')
@UseGuards(JwtAuthGuard)
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getTweetsFeed(@GetUser() user: JwtUserClaims) {
    return this.tweetsService.getTweetsFeed(user.userId);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  findTweetsByUserId(@GetUser() user: JwtUserClaims) {
    return this.tweetsService.findTweetsByUserId(user.userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  postTweet(
    @GetUser() user: JwtUserClaims,
    @Body() postTweetDto: PostTweetDto,
  ) {
    return this.tweetsService.postTweet(user.userId, postTweetDto.post);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTweet(@Param() id: string) {
    return this.tweetsService.deleteTweet(id);
  }
}
