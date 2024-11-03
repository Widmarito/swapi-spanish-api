import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from '@/src/config';
import { Character } from '../modules/characters/entities';

const useSSL =
  envs.environment === 'production' || envs.environment === 'staging';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUser,
      password: envs.dbPassword,
      database: envs.dbName,
      ssl: useSSL ? { rejectUnauthorized: false } : false,
      // synchronize: envs.environment !== 'production',
      synchronize: true,
      entities: [Character],
    }),
  ],
})
export class DatabaseModule {}
