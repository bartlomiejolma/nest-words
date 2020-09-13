import { DefinitionDto } from './definition.dto';

export class CreateWordDto {
  name: string;
  definitions: DefinitionDto[];
}
