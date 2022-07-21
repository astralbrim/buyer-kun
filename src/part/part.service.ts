import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartEntity } from './part.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductType } from '../product/product.constant';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(PartEntity)
    private readonly partRepository: Repository<PartEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getByName(name: string): Promise<PartEntity | null> {
    return await this.partRepository.findOneBy({ name });
  }

  async add(
    partsData: {name: string,
    minPrice: number,
    maxPrice: number,
    type: ProductType}[]
  ): Promise<PartEntity[]> {
    const parts = partsData.map(({name,minPrice, maxPrice, type}) => PartEntity.create(name, minPrice, maxPrice, type))
    const result = await this.partRepository.save(parts);
    this.eventEmitter.emit('part.add');
    return result;
  }

  async getAll(): Promise<PartEntity[]> {
    return await this.partRepository.find();
  }

  async updateMarketPrice(
    name: string,
    marketPrice: number,
  ): Promise<PartEntity | null> {
    const part = await this.getByName(name);
    part.marketPrice = marketPrice;
    return await this.partRepository.save(part);
  }

  async updateSetting(
    name: string,
    minPrice: number,
    maxPrice: number,
  ): Promise<PartEntity | null> {
    const part = await this.getByName(name);
    if (!part) return null;
    part.name = name;
    part.minPrice = minPrice;
    part.maxPrice = maxPrice;
    return await this.partRepository.save(part);
  }

  async delete(partName: string): Promise<boolean> {
    return !!(await this.partRepository.delete({ name: partName }));
  }
}
