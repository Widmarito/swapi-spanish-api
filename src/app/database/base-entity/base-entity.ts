import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @CreateDateColumn({ name: 'created' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'edited' })
  edited: Date;
}
