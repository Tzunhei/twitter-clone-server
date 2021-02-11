import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './baseConfig';

export const migrationsConfig: TypeOrmModuleOptions = {
  ...config,
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
