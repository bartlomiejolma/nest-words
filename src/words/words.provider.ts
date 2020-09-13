import { Connection } from 'typeorm';
import { WordEntity } from './entities/words.entity';

import {
  WORDS_REPOSITORY,
  DATABASE_CONNECTION,
  DEFINITIONS_REPOSITORY,
} from 'src/consts';
import { DefinitionEntity } from './entities/definitions.entity';

export const wordsProviders = [
  {
    provide: WORDS_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(WordEntity),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: DEFINITIONS_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(DefinitionEntity),
    inject: [DATABASE_CONNECTION],
  },
];
