import { Connection, Repository } from 'typeorm';
import { WordEntity } from './words.entity';

export const wordsProviders = [
  {
    provide: 'WORDS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(WordEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
