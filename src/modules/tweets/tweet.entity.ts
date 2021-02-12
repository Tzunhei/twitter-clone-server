import { Base } from 'src/shared/entities/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Tweet extends Base {
  @ManyToOne(() => User, (user) => user.tweets)
  user: User;

  @Column({ nullable: false })
  post: string;

  @Column()
  favorites: number;

  @Column()
  replies: number;

  @Column()
  retweets: number;
}
