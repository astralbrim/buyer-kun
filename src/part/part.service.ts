import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartEntity } from './part.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(PartEntity)
    private readonly partRepository: Repository<PartEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getByName(name: string): Promise<PartEntity> {
    return await this.partRepository.findOneBy({ name });
  }

  async add(name, minPrice, maxPrice, type): Promise<PartEntity> {
    const part = PartEntity.create(name, minPrice, maxPrice, type);
    const result = await this.partRepository.save(part);
    this.eventEmitter.emit('part.add');
    return result;
  }

  async getAll(): Promise<PartEntity[]> {
    return await this.partRepository.find();
  }

  async updateMarketPrice(name: string, marketPrice: number) {
    const part = await this.getByName(name);
    part.marketPrice = marketPrice;
    await this.partRepository.save(part);
  }
}
