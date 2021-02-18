import { IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class PostTweetDto {
  @IsString()
  post: string;
}

export class FindTweetsByHashtagDto extends PaginationDto {
  @IsString()
  tag: string;
}
