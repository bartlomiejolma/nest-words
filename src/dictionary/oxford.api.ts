import axios from 'axios';

import { DictionaryApi } from './dictionary.service';

export class OxfordApi extends DictionaryApi {
  async getWord(word: string) {
    const LANGUAGE = 'en-gb';
    const url = `https://od-api.oxforddictionaries.com:443/api/v2/entries/${LANGUAGE}/${word.toLowerCase()}`;
    const response = await axios.get(url, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        app_id: process.env.OXFORD_APP_ID,
        // eslint-disable-next-line @typescript-eslint/camelcase
        app_key: process.env.OXFORD_APP_KEY,
      },
    });
    return response.data;
  }
}
