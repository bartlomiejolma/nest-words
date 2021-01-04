import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Example } from '../example';
import { Word } from '../word';
import { WordEntity } from './words.entity';

@Entity()
export class ExampleEntity implements Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @ManyToOne(
    () => WordEntity,
    word => word.examples,
  )
  word: Word;
}
