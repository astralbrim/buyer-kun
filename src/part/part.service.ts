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
    name: string,
    minPrice: number,
    maxPrice: number,
    type: ProductType
  ): Promise<PartEntity> {
    const part = PartEntity.create(name, minPrice, maxPrice, type);
    const result = await this.partRepository.save(part);
    this.eventEmitter.emit('part.add');
    return result;
  }

  async addAndUpdate(parts: {name: string,
    type: ProductType,
    minPrice: number,
    maxPrice: number;}[]) {
    const currentParts = await this.getAll();
    const newParts = parts.filter((part) => {
      return currentParts.every((current) => current.name != part.name)
    })
    const deletedPart = currentParts.filter(
      (current) => {
        let isDeleted = true;
        parts.forEach(
          (part) => {
            if(part.name == current.name) isDeleted = false
          }
        )
        return isDeleted;
      }
    )
    for (const {name, minPrice, maxPrice, type} of newParts) {
      await this.add(name, minPrice, maxPrice, type);
    }
    for (const {name} of deletedPart) {
      await this.delete(name);
    }
    parts.forEach(
      ({name, minPrice, maxPrice, type}) => {
        this.updateSetting(name, minPrice, maxPrice, type);
      }
    )
    return await this.getAll();

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
    type: ProductType
  ): Promise<PartEntity | null> {
    const part = await this.getByName(name);
    if (!part) return null;
    part.name = name;
    part.minPrice = minPrice;
    part.maxPrice = maxPrice;
    part.type = type;
    return await this.partRepository.save(part);
  }

  async delete(partName: string): Promise<boolean> {
    return !!(await this.partRepository.delete({ name: partName }));
  }
}
