import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DictionaryService } from '../../dictionary/dictionary.service';
import { Definition } from '../definition';
import { DefinitionEntity } from '../entities/definitions.entity';
import { ExampleEntity } from '../entities/examples.entity';
import { WordEntity } from '../entities/words.entity';
import { Word } from '../word';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<Word>,
    @InjectRepository(DefinitionEntity)
    private definitionsRepository: Repository<Definition>,
    @InjectRepository(ExampleEntity)
    private examplesRepository: Repository<Definition>,
    private readonly dictionaryService: DictionaryService,
  ) {}

  async getWords(): Promise<Word[]> {
    return this.wordRepository.find({ relations: ['definitions', 'examples'] });
  }

  async addWord(word: Word) {
    const dictionaryResponse = await this.dictionaryService.getDefinition(
      word.name,
    );
    const wordEntity = await this.wordRepository.save({
      ...word,
      phoneticSpelling: dictionaryResponse?.phoneticSpelling,
      lexicalCategory: dictionaryResponse?.lexicalCategory,
    });

    for (const definition of dictionaryResponse?.definitions.filter(Boolean) ||
      []) {
      const definitionEntity = new DefinitionEntity();
      definitionEntity.word = wordEntity;
      definitionEntity.text = definition;
      await this.definitionsRepository.save(definitionEntity);
    }

    for (const example of dictionaryResponse?.examples.filter(Boolean) || []) {
      const exampleEntity = new ExampleEntity();
      exampleEntity.word = wordEntity;
      exampleEntity.text = example;
      await this.examplesRepository.save(exampleEntity);
    }
  }
}
