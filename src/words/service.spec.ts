import { WordsService } from './service';
import { Word } from './word';

describe('WordsService', () => {
  describe('getWords', () => {
    it('should not throw', async () => {
      const service = new WordsService();
      await service.getWords();
    });
  });

  describe('addWord', () => {
    it('should return newly added word', async () => {
      const word: Word = { name: 'foo' };
      const service = new WordsService();

      await service.addWord(word);

      const words = await service.getWords();

      expect(words[words.length - 1]).toBe(word);
    });
  });
});
