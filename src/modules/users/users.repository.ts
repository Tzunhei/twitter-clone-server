import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';

type FollowCountColumns = 'nb_followers' | 'nb_following';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  async getUserFollowings(userId: number, limit?: number, offset?: number) {
    try {
      return await this.createQueryBuilder()
        .leftJoinAndSelect(
          'user_follow_user',
          'follow',
          'follow.userId_1 = User.id',
        )
        .where((qb) => {
          const followingsIds = qb
            .subQuery()
            .select('follow.userId_2')
            .from('user_follow_user', 'follow')
            .where('follow.userId_1 = :id', { id: userId })
            .getQuery();
          return `User.id IN ${followingsIds}`;
        })
        .take(limit)
        .skip(offset)
        .getMany();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getUserFollowers(userId: number, limit?: number, offset?: number) {
    try {
      return await this.createQueryBuilder()
        .leftJoinAndSelect(
          'user_follow_user',
          'follow',
          'follow.userId_1 = User.id',
        )
        .where('follow.userId_2 = :id', { id: userId })
        .take(limit)
        .skip(offset)
        .getMany();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findUserByUsername(username: string) {
    try {
      return this.findOne({ username });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findUserById(id: string) {
    try {
      return this.findOne(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const password = await this.hashPassword(createUserDto.password);
      const user = this.create({
        ...createUserDto,
        password,
      });
      await this.save(user);
      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.update(id, updateUserDto);
      return this.findOne(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.delete(id);
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async incrementFollowCount(userId: number, column: FollowCountColumns) {
    try {
      await this.increment({ id: userId }, column, 1);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async decrementFollowCount(userId: number, column: FollowCountColumns) {
    try {
      await this.decrement({ id: userId }, column, 1);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async followUser(user: User, follow: User) {
    try {
      await this.createQueryBuilder()
        .relation(User, 'follow')
        .of(user)
        .add(follow);
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async unfollowUser(user: User, followId: number) {
    try {
      await this.createQueryBuilder()
        .relation(User, 'follow')
        .of(user)
        .remove(followId);
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
