import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Word } from '../word';
import { DefinitionEntity } from './definitions.entity';

@Entity()
export class WordEntity implements Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany(
    type => DefinitionEntity,
    definition => definition.word,
  )
  definitions: DefinitionEntity[];
}
