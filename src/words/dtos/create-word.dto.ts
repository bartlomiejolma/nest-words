import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Word } from '../word';
import { DefinitionDto } from './definition.dto';

export class CreateWordDto implements Word {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  definitions: DefinitionDto[];
}
