import { Definition } from './definition';
import { Example } from './example';

export interface Word {
  name: string;
  definitions: Definition[];
  phoneticSpelling?: string;
  examples?: Example[];
  lexicalCategory?: string;
}
