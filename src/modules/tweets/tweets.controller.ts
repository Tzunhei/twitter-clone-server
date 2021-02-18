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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { GetUser } from '../auth/getUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUserClaims } from '../auth/jwtClaims.interface';
import { FindTweetsByHashtagDto, PostTweetDto } from './tweets.dto';
import { TweetsService } from './tweets.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tweets')
@UseGuards(JwtAuthGuard)
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getTweetsFeed(
    @GetUser() user: JwtUserClaims,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.tweetsService.getTweetsFeed(user.userId, paginationDto);
  }

  @Get('hashtag')
  @HttpCode(HttpStatus.OK)
  findTweetsByHashtag(@Query() findTweetsByHashtagDto: FindTweetsByHashtagDto) {
    return this.tweetsService.findTweetsByHashtag(findTweetsByHashtagDto);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  findTweetsByUserId(@GetUser() user: JwtUserClaims) {
    return this.tweetsService.findTweetsByUserId(user.userId);
  }

  @Get()
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
