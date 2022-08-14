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
  /**
   * id
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * パーツの種類名
   */
  @Column('varchar')
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
