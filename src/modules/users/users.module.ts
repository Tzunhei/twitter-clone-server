import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
