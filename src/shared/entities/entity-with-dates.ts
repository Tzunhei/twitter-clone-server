import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Dates {
  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  createdAt: number;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updatedAt: number;

  @DeleteDateColumn({ nullable: true, type: 'timestamptz' })
  deletedAt: number;
}
