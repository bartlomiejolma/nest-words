import { User } from '../users/user.interface';
import { Word } from '../words/word';

export const results = ['Pending', 'Success', 'Error'] as const;
export type Result = typeof results[number];

export interface Exercise {
  id?: number;
  user?: User;
  word?: Word;
  result?: Result;
}
