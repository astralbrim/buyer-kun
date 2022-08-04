import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductsEntity } from '../products/products.entity';
import { PartTypesEntity } from '../part-types/part-types.entity';

@Entity('part')
export class PartsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'パーツ名',
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    comment: '相場の調査の対象であるか',
    type: 'boolean',
  })
  isResearchTarget: boolean;
  @Column({
    comment: '相場を調査する場合の最低価格',
    type: 'int',
    nullable: true,
  })
  minPrice?: number;

  @Column({
    comment: '相場を調査する場合の最高価格',
    type: 'int',
    nullable: true,
  })
  maxPrice?: number;

  @Column({
    comment: '相場',
    type: 'float',
    nullable: true,
  })
  marketPrice?: number;

  @ManyToOne(() => PartTypesEntity, (partTypes) => partTypes.parts, {
    createForeignKeyConstraints: false,
    persistence: false,
  })
  @JoinColumn({
    name: 'part_types_id',
    referencedColumnName: 'id',
  })
  partTypes: PartTypesEntity;

  @OneToMany(() => ProductsEntity, (productEntity) => productEntity.part, {
    createForeignKeyConstraints: false,
    persistence: false,
  })
  products?: ProductsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public static create(
    name: string,
    minPrice: number,
    maxPrice: number,
    partsTypes: PartTypesEntity,
    isResearchTarget: boolean,
  ) {
    const newInstance = new PartsEntity();
    newInstance.name = name;
    newInstance.minPrice = minPrice;
    newInstance.maxPrice = maxPrice;
    newInstance.partTypes = partsTypes;
    newInstance.isResearchTarget = isResearchTarget;
    newInstance.marketPrice = null;
    return newInstance;
  }
}
