import { Injectable, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Definition } from '../definition';
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
    for (const definition of word.definitions) {
      this.definitionsRepository.insert(definition);
    }
    this.wordRepository.insert(word);
  }
}
