import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Dates } from './entity-with-dates';

@Entity()
export abstract class IdAndDates extends Dates {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
