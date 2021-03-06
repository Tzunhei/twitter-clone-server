import { Base } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends Base {
  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
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
  nb_followers: number;

  @Column({ default: 0 })
  nb_following: number;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_followings',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'following_userId',
      referencedColumnName: 'id',
    },
  })
  followings: User[];
}
