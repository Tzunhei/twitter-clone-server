import { Entity } from 'typeorm';
import { IdAndDates } from './entity-with-id-dates';

@Entity()
export abstract class Base extends IdAndDates {}
