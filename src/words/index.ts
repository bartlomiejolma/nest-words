import { Module } from '@nestjs/common';
import { WordsController } from './controller';
import { WordsService } from './service';
import { WordEntity } from './entities/words.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
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
