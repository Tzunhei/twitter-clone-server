import { Base } from 'src/shared/entities/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';
import { User } from '../users/user.entity';

@Entity()
export class Like extends Base {
  @ManyToOne(() => Tweet)
  tweet: Tweet;

  @ManyToOne(() => User)
  user: User;
}
