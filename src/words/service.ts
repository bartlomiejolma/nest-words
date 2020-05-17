import { Injectable } from '@nestjs/common';

import { Word } from './word';

@Injectable()
export class WordsService {
  private words: Word[];

  constructor() {
    this.words = [];
  }

  getWords(): Word[] {
    return this.words;
  }

  addWord(word: Word) {
    this.words.push(word);
  }
}
