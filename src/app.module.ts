import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './ormconfig/baseConfig';
import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LikesModule } from './modules/likes/likes.module';
import { ConfigModule } from '@nestjs/config';
import { HashtagsModule } from './modules/hashtags/hashtags.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    TweetsModule,
    LikesModule,
    HashtagsModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
