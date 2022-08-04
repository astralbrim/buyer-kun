import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PartsEntity } from '../parts/parts.entity';

@Entity()
export class PartTypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { comment: 'パーツの種類名' })
  name: string;

  @OneToMany(() => PartsEntity, (parts) => parts.partTypes, {
    createForeignKeyConstraints: false,
    persistence: false,
    nullable: true,
  })
  parts?: PartsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(name: string): PartTypesEntity {
    const newInstance = new this();
    newInstance.name = name;
    return newInstance;
  }
}
