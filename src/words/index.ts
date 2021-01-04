import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordsController } from './controller';
import { WordsService } from './service';
import { WordEntity } from './entities/words.entity';
import { DefinitionEntity } from './entities/definitions.entity';
import { DictionaryModule } from '../dictionary/dictionary.module';
import { ExampleEntity } from './entities/examples.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordEntity, DefinitionEntity, ExampleEntity]),
    DictionaryModule,
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
