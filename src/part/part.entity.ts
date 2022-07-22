import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductType } from '../product/product.constant';
import { ProductEntity } from '../product/product.entity';

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

  @OneToMany(() => ProductEntity, (productEntity) => productEntity.part, {
    createForeignKeyConstraints: false,
    persistence: false,
  })
  products?: ProductEntity[];

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
