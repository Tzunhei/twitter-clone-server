import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';

@Entity()
export class User {
  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  biography: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  following: number;
}
