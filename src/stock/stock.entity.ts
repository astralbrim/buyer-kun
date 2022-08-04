import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '名前',
    type: 'varchar',
  })
  name: string;

  @Column({
    comment: 'いくつあるか',
    type: 'int',
  })
  qty: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(name: string, initialQty: number) {
    const newInstance = new this();
    newInstance.name = name;
    newInstance.qty = initialQty;
    return newInstance;
  }
}
