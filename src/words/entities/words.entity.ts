import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Definition } from '../definition';
import { DefinitionEntity } from './definitions.entity';

@Entity()
export class WordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany(
    type => DefinitionEntity,
    definition => definition.word,
  )
  definitions: Definition[];
}
