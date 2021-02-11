import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './users.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const user = this.create(createUserDto);
    console.log(await this.find());
    try {
      // await this.save(user);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
