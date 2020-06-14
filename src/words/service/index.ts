import { Injectable, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Word } from '../word';

@Injectable()
export class WordsService {
  constructor(
    @Inject('WORDS_REPOSITORY')
    private wordRepository: Repository<Word>,
  ) {}

  async getWords(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  async addWord(word: Word) {
    this.wordRepository.insert(word);
  }
}
