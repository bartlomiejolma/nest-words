import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from '.';
import { Word } from '../word';
import { Definition } from '../definition';

import { getRepositoryToken } from '@nestjs/typeorm';

import { WORDS_REPOSITORY, DEFINITIONS_REPOSITORY } from '../../consts';
import { WordEntity } from '../entities/words.entity';
import { DefinitionEntity } from '../entities/definitions.entity';

class InMemoryRepository<T> {
  private entries: T[];

  constructor() {
    this.entries = [];
  }
  find() {
    return this.entries;
  }
  save(entry: T) {
    this.entries.push(entry);
  }
}
describe('WordsService', () => {
  let wordsService: WordsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        {
          provide: getRepositoryToken(WordEntity),
          useFactory: () => new InMemoryRepository<Word>(),
        },
        {
          provide: getRepositoryToken(DefinitionEntity),
          useFactory: () => new InMemoryRepository<Definition>(),
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

      expect(words[words.length - 1]).toEqual(word);
    });
  });
});
