import { Injectable, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Definition } from '../definition';
import { DefinitionEntity } from '../entities/definitions.entity';
import { Word } from '../word';

@Injectable()
export class WordsService {
  constructor(
    @Inject('WORDS_REPOSITORY')
    private wordRepository: Repository<Word>,
    @Inject('DEFINITIONS_REPOSITORY')
    private definitionsRepository: Repository<Definition>,
  ) {}

  async getWords(): Promise<Word[]> {
    return this.wordRepository.find({ relations: ['definitions'] });
  }

  async addWord(word: Word) {
    const wordEntity = await this.wordRepository.save(word);
    for (const definition of word.definitions) {
      const definitionEntity = new DefinitionEntity();
      definitionEntity.word = wordEntity;
      definitionEntity.text = definition.text;
      console.log(definitionEntity);
      await this.definitionsRepository.save(definitionEntity);
    }
  }
}
