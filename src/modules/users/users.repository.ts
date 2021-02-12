import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './users.dto';
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
}
