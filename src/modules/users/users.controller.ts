import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IsEmail } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('email')
  @HttpCode(HttpStatus.OK)
  findUserByEmail(@Query('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Get('username')
  @HttpCode(HttpStatus.OK)
  findUserByUsername(@Query('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
