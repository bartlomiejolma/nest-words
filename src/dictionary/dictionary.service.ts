import { Injectable } from '@nestjs/common';

export abstract class DictionaryApi {
  abstract async getWord(word: string): Promise<Record<string, string>>;
}
@Injectable()
export class DictionaryService {
  constructor(private readonly dictionaryApi: DictionaryApi) {}

  async getDefinition(word: string) {
    const apiResponse = await this.dictionaryApi.getWord(word);
    return this.parseApiResponse(apiResponse);
  }

  parseApiResponse(apiResponse: any) {
    return apiResponse;
  }
}
