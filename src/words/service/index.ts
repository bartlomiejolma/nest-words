import { Injectable } from '@nestjs/common';

import { Word } from '../word';

@Injectable()
export class WordsService {
  private words: Word[];

  constructor() {
    this.words = [];
  }

  async getWords(): Promise<Word[]> {
    return this.words;
  }

  async addWord(word: Word) {
    this.words.push(word);
  }
}
