import { Word } from '../word';
import { DefinitionDto } from './definition.dto';

export class CreateWordDto implements Word {
  name: string;
  definitions: DefinitionDto[];
}
