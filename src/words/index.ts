import { Module } from '@nestjs/common';
import { WordsController } from './controller';
import { WordsService } from './service';

@Module({
  imports: [],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
