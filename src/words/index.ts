import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordsController } from './controller';
import { WordsService } from './service';
import { WordEntity } from './entities/words.entity';
import { DefinitionEntity } from './entities/definitions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordEntity]),
    TypeOrmModule.forFeature([DefinitionEntity]),
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
