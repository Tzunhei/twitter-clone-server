import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async comparePassword(input: string, password: string) {
    return await bcrypt.compare(input, password);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    const passwordMatch = await this.comparePassword(password, user.password);
    if (user && passwordMatch) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
