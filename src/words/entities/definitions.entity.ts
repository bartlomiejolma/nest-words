import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Definition } from '../definition';
import { Word } from '../word';
import { WordEntity } from './words.entity';

@Entity()
export class DefinitionEntity implements Definition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @ManyToOne(
    () => WordEntity,
    word => word.definitions,
  )
  word: Word;
}
