import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Definition } from '../definition';
import { DefinitionEntity } from '../entities/definitions.entity';
import { WordEntity } from '../entities/words.entity';
import { Word } from '../word';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<Word>,
    @InjectRepository(DefinitionEntity)
    private definitionsRepository: Repository<Definition>,
  ) {}

  async getWords(): Promise<Word[]> {
    return this.wordRepository.find({ relations: ['definitions'] });
  }

  async addWord(word: Word) {
    const wordEntity = await this.wordRepository.save(word);
    for (const definition of word.definitions || []) {
      const definitionEntity = new DefinitionEntity();
      definitionEntity.word = wordEntity;
      definitionEntity.text = definition.text;
      await this.definitionsRepository.save(definitionEntity);
    }
  }
}
