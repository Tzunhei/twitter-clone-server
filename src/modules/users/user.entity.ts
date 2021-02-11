import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';

@Entity()
export class User {
  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  biography: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  following: number;
}
