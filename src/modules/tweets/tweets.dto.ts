import { IsString } from 'class-validator';

export class PostTweetDto {
  @IsString()
  post: string;
}
