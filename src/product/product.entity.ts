import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartEntity } from '../part/part.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  displayName: string;

  @Column()
  soldOut: boolean;

  @Column()
  link: string;

  @Column()
  uploadedAt: Date;

  @ManyToOne(() => PartEntity, (partEntity) => partEntity)
  @JoinColumn({
    name: 'part_id',
    referencedColumnName: 'id',
  })
  part: PartEntity;

  @Column()
  alreadyNotified: boolean;

  static create(
    displayName: string,
    link: string,
    uploadedAt: Date,
    price: number,
    part: PartEntity,
    soldOut: boolean,
  ) {
    const newInstance = new ProductEntity();
    newInstance.displayName = displayName;
    newInstance.link = link;
    newInstance.uploadedAt = uploadedAt;
    newInstance.price = price;
    newInstance.part = part;
    newInstance.soldOut = soldOut;
    newInstance.alreadyNotified = false;

    return newInstance;
  }
}
