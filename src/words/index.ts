import { Module } from '@nestjs/common';
import { WordsController } from './controller';
import { WordsService } from './service';
import { DatabaseModule } from '../database/database.module';
import { wordsProviders } from './words.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [WordsController],
  providers: [WordsService, ...wordsProviders],
})
export class WordsModule {}
