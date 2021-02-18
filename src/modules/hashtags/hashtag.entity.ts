import { Base } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';

@Entity()
export class Hashtag extends Base {
  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags)
  tweets: Tweet[];

  @Column({ nullable: false, unique: true })
  tag: string;
}
