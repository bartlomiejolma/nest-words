import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { WordsModule } from './words';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [
    WordsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string(),
        DATABASE_HOST: Joi.string(),
        DATABASE_PORT: Joi.number(),
        DATABASE_USER: Joi.string(),
        DATABASE_PASSWORD: Joi.string(),
        DATABASE_NAME: Joi.string(),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
      })
        .or('DATABASE_URL', 'DATABASE_HOST')
        .with('DATABASE_HOST', [
          'DATABASE_PORT',
          'DATABASE_USER',
          'DATABASE_PASSWORD',
          'DATABASE_NAME',
        ]),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    DictionaryModule,
  ],
})
export class AppModule {}
