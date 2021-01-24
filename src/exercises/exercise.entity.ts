import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../users/user.entity';
import { WordEntity } from '../words/entities/words.entity';
import { Exercise, Result, results } from './exercise.interface';

@Entity()
export class ExerciseEntity implements Exercise {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => WordEntity, 'exercises')
  public word: WordEntity;

  @ManyToOne(() => UserEntity, 'exercises')
  public user: UserEntity;

  @Column({
    type: 'enum',
    enum: results,
    default: [results[0]],
  })
  public result: Result;
}
