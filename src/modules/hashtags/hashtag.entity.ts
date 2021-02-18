import { Base } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';

@Entity()
export class Hashtag extends Base {
  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags)
  @JoinTable()
  tweets: Tweet[];

  @Column({ nullable: false, unique: true })
  tag: string;
}
