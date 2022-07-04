import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  partName: string;

  @Column()
  alreadyNotified: boolean;

  static create(
    displayName: string,
    link: string,
    uploadedAt: Date,
    price: number,
    partName: string,
    soldOut: boolean,
  ) {
    const newInstance = new ProductEntity();
    newInstance.displayName = displayName;
    newInstance.link = link;
    newInstance.uploadedAt = uploadedAt;
    newInstance.price = price;
    newInstance.partName = partName;
    newInstance.soldOut = soldOut;
    newInstance.alreadyNotified = false;

    return newInstance;
  }
}
