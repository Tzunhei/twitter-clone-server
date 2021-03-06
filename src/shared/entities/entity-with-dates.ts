import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Dates extends BaseEntity {
  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  createdAt: number;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz', select: false })
  updatedAt: number;

  @DeleteDateColumn({ nullable: true, type: 'timestamptz', select: false })
  deletedAt: number;
}
