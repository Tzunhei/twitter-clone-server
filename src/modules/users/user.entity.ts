import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  biography: string;

  @Column()
  isActive: boolean;

  @Column()
  followers: number;

  @Column()
  following: number;
}
