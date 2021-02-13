import { Base } from 'src/shared/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends Base {
  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  biography: string;

  @Column({ default: true, select: false })
  isActive: boolean;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  following: number;
}
