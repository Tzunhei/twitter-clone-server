import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Tweet {
  @ManyToOne(() => User, (user) => user.tweets)
  user: User;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  post: string;

  @Column()
  favorites: number;

  @Column()
  replies: number;

  @Column()
  retweets: number;
}
