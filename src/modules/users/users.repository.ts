import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
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
}
