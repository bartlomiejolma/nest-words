import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from '.';
import { Word } from '../word';
import { Definition } from '../definition';

import { WORDS_REPOSITORY } from '../../consts';

class InMemoryRepository {
  private words: Word[];

  constructor() {
    this.words = [];
  }
  find() {
    return this.words;
  }
  insert(word: Word) {
    this.words.push(word);
  }
}
describe('WordsService', () => {
  let wordsService: WordsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        {
          provide: WORDS_REPOSITORY,
          useClass: InMemoryRepository,
        },
      ],
    }).compile();

    wordsService = await moduleRef.resolve(WordsService);
  });

  describe('getWords', () => {
    it('should not throw', async () => {
      await wordsService.getWords();
    });
  });

  describe('addWord', () => {
    it('should return newly added word', async () => {
      const definitions: Definition[] = [{ text: 'bar' }];
      const word: Word = { name: 'foo', definitions };

      await wordsService.addWord(word);

      const words = await wordsService.getWords();

      expect(words[words.length - 1]).toBe(word);
    });
  });
});
