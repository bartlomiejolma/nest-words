import { Test, TestingModule } from '@nestjs/testing';

import { DictionaryApi, DictionaryService } from './dictionary.service';
import * as sampleResponse from './sample.response.json';

class MockedDictionaryApi extends DictionaryApi {
  async getWord(word: string) {
    return Promise.resolve({ word: word });
  }
}
describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DictionaryService,
        { provide: DictionaryApi, useClass: MockedDictionaryApi },
      ],
    }).compile();

    service = module.get<DictionaryService>(DictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('can parse sample word', () => {
    const expectedParsedResponse = {
      name: 'commencement',
      phoneticSpelling: 'kəˈmɛnsm(ə)nt',
      definitions: [
        'the beginning of something',
        'a ceremony in which degrees or diplomas are conferred on university or high-school students',
      ],
      examples: [
        'the commencement of the trial',
        'the date of commencement',
        'a commencement address',
      ],
      lexicalCategory: 'Noun',
    };
    const parsedResponse = service.parseApiResponse(sampleResponse);
    expect(parsedResponse).toEqual(expectedParsedResponse);
  });
});
