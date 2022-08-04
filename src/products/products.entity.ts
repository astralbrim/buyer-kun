import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PartsEntity } from '../parts/parts.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '価格',
    type: 'int',
  })
  price: number;

  @Column({
    comment: '表示名',
    type: 'varchar',
  })
  displayName: string;

  @Column({
    comment: '売り切れであるか',
    type: 'boolean',
  })
  isSoldOut: boolean;

  @Column({
    comment: 'リンク',
    type: 'varchar',
  })
  link: string;

  @Column({
    comment: '既に通知したか',
    type: 'boolean',
  })
  isAlreadyNotified: boolean;

  @ManyToOne(() => PartsEntity, (partEntity) => partEntity, {
    createForeignKeyConstraints: false,
    persistence: false,
  })
  @JoinColumn({
    name: 'part_id',
    referencedColumnName: 'id',
  })
  part: PartsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(
    displayName: string,
    link: string,
    uploadedAt: Date,
    price: number,
    part: PartsEntity,
    soldOut: boolean,
  ) {
    const newInstance = new ProductsEntity();
    newInstance.displayName = displayName;
    newInstance.link = link;
    newInstance.price = price;
    newInstance.part = part;
    newInstance.isSoldOut = soldOut;
    newInstance.isAlreadyNotified = false;

    return newInstance;
  }
}
