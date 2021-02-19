import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';

type FollowCountColumns = 'nb_followers' | 'nb_following';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  async getUserFollowings(userId: string, limit?: number, offset?: number) {
    try {
      return await this.createQueryBuilder()
        .leftJoinAndSelect('user_followings', 'uf', 'uf.userId = User.id')
        .where((qb) => {
          const followingsIds = qb
            .subQuery()
            .select('uf.following_userId')
            .from('user_followings', 'uf')
            .where('uf.userId = :id', { id: userId })
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

  async getUserFollowers(userId: string, limit?: number, offset?: number) {
    try {
      return await this.createQueryBuilder()
        .leftJoinAndSelect('user_followings', 'uf', 'uf.userId = User.id')
        .where('uf.following_userId = :id', { id: userId })
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

  async incrementFollowCount(userId: string, column: FollowCountColumns) {
    try {
      await this.increment({ id: userId }, column, 1);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async decrementFollowCount(userId: string, column: FollowCountColumns) {
    try {
      await this.decrement({ id: userId }, column, 1);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async followUser(user: User, following: User) {
    try {
      await this.createQueryBuilder()
        .relation(User, 'followings')
        .of(user)
        .add(following);
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async unfollowUser(user: User, followId: string) {
    try {
      await this.createQueryBuilder()
        .relation(User, 'followings')
        .of(user)
        .remove(followId);
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async searchUsers(search: string) {
    try {
      return await this.find({ username: Like(`${search}%`) });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
