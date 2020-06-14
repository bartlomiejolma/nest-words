import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WordsModule } from './words';

@Module({
  imports: [WordsModule, ConfigModule.forRoot()],
})
export class AppModule {}
