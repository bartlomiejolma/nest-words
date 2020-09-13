import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Word } from '../word';
import { WordEntity } from './words.entity';

@Entity()
export class DefinitionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @ManyToOne(
    type => WordEntity,
    word => word.definitions,
  )
  word: Word;
}
