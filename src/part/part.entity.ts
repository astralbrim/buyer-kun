import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductType } from '../product/product.constant';

@Entity('part')
export class PartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  minPrice: number;

  @Column()
  maxPrice: number;

  @Column()
  type: ProductType;

  @Column({ nullable: true })
  marketPrice?: number;

  public static create(
    name: string,
    minPrice: number,
    maxPrice: number,
    type: ProductType,
  ) {
    const newInstance = new PartEntity();
    newInstance.name = name;
    newInstance.minPrice = minPrice;
    newInstance.maxPrice = maxPrice;
    newInstance.type = type;
    return newInstance;
  }
}
