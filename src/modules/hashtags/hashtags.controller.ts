import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HashtagsService } from './hashtags.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('hashtags')
@UseGuards(JwtAuthGuard)
export class HashtagsController {
  constructor(private hashtagsService: HashtagsService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getAllHashtags() {
    return this.hashtagsService.findAllHashtags();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteHashtag(@Param('id') hashtagId: string) {
    return this.hashtagsService.deleteHashtag(hashtagId);
  }
}
