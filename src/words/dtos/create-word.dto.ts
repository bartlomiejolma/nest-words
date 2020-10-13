import { IsNotEmpty } from 'class-validator';

import { Word } from '../word';
import { DefinitionDto } from './definition.dto';

export class CreateWordDto implements Word {
  @IsNotEmpty()
  name: string;
  definitions: DefinitionDto[];
}
