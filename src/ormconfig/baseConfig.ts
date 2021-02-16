import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'clementyam',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'twitter-clone',
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  synchronize: true,
};
