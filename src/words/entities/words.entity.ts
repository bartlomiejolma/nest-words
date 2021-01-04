import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Word } from '../word';
import { DefinitionEntity } from './definitions.entity';
import { ExampleEntity } from './examples.entity';

@Entity()
export class WordEntity implements Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany(
    () => DefinitionEntity,
    definition => definition.word,
  )
  definitions: DefinitionEntity[];

  @OneToMany(
    () => ExampleEntity,
    example => example.word,
  )
  examples: ExampleEntity[];

  @Column({ length: 500, nullable: true })
  lexicalCategory: string;

  @Column({ length: 500, nullable: true })
  phoneticSpelling: string;
}
