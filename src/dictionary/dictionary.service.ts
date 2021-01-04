import { Injectable } from '@nestjs/common';

interface ApiPronunciations {
  phoneticSpelling: string;
}
interface ApiExample {
  text: string;
}

interface ApiSenses {
  definitions: string[];
  examples: ApiExample[];
}
interface ApiEntries {
  pronunciations?: ApiPronunciations[];
  senses: ApiSenses[];
}

interface ApiLexicalCategory {
  text: string;
}
interface ApiLexicalEntries {
  entries: ApiEntries[];
  lexicalCategory: ApiLexicalCategory;
}
interface ApiSingleResult {
  lexicalEntries: ApiLexicalEntries[];
}
interface ApiResponse {
  id: string;
  results: ApiSingleResult[];
}

export abstract class DictionaryApi {
  abstract getWord(word: string): Promise<ApiResponse>;
}
@Injectable()
export class DictionaryService {
  constructor(private readonly dictionaryApi: DictionaryApi) {}

  async getDefinition(word: string) {
    const apiResponse = await this.dictionaryApi.getWord(word);
    return this.parseApiResponse(apiResponse);
  }

  parseApiResponse(apiResponse: ApiResponse) {
    const name = apiResponse.id;
    const phoneticSpelling =
      apiResponse.results[0].lexicalEntries[0].entries[0].pronunciations[0]
        .phoneticSpelling;
    const lexicalCategory =
      apiResponse.results[0].lexicalEntries[0].lexicalCategory.text;
    const definitions = apiResponse.results.flatMap((result: ApiSingleResult) =>
      result.lexicalEntries.flatMap((lexicalEntry: ApiLexicalEntries) =>
        lexicalEntry.entries.flatMap(entry =>
          entry.senses.flatMap(sense => sense.definitions),
        ),
      ),
    );
    const examples = apiResponse.results.flatMap((result: ApiSingleResult) =>
      result.lexicalEntries.flatMap((lexicalEntry: ApiLexicalEntries) =>
        lexicalEntry.entries.flatMap(entry =>
          entry.senses.flatMap(sense =>
            sense.examples.flatMap(example => example.text),
          ),
        ),
      ),
    );
    return { name, phoneticSpelling, definitions, examples, lexicalCategory };
  }
}
