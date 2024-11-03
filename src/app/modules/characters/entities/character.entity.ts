import { BaseEntity } from '@/src/app/database/base-entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'character' })
export class Character extends BaseEntity {
  @Column()
  name: string;

  @Column()
  mass: string;
}
