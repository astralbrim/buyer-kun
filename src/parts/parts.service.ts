import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartsEntity } from './parts.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PartTypesService } from '../part-types/part-types.service';
import { PartTypesEntity } from '../part-types/part-types.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(PartsEntity)
    private readonly partRepository: Repository<PartsEntity>,
    private readonly partTypesService: PartTypesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getByName(name: string): Promise<PartsEntity | null> {
    return await this.partRepository.findOneBy({ name });
  }

  async add(
    name: string,
    partTypeName: string,
    isResearchTarget: boolean,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<PartsEntity> {
    const partType = await this.partTypesService.getOneByName(partTypeName);
    const part = PartsEntity.create(
      name,
      minPrice,
      maxPrice,
      partType,
      isResearchTarget,
    );
    const result = await this.partRepository.save(part);
    this.eventEmitter.emit('part.add');
    return result;
  }

  async addAndUpdate(
    parts: {
      name: string;
      minPrice?: number;
      maxPrice?: number;
      partTypes: PartTypesEntity;
      isResearchTarget: boolean;
    }[],
  ): Promise<PartsEntity[]> {
    const currentParts = await this.getAll();
    const newParts = parts.filter((part) => {
      return currentParts.every((current) => current.name != part.name);
    });
    const deletedPart = currentParts.filter((current) => {
      let isDeleted = true;
      parts.forEach((part) => {
        if (part.name == current.name) isDeleted = false;
      });
      return isDeleted;
    });
    for (const {
      name,
      minPrice,
      maxPrice,
      partTypes,
      isResearchTarget,
    } of newParts) {
      await this.add(
        name,
        partTypes.name,
        isResearchTarget,
        minPrice,
        maxPrice,
      );
    }

    for (const { name } of deletedPart) {
      await this.delete(name);
    }
    for (const {
      name,
      minPrice,
      maxPrice,
      isResearchTarget,
      partTypes,
    } of parts) {
      for (const currentPart of currentParts) {
        if (
          minPrice != currentPart.minPrice ||
          maxPrice != currentPart.maxPrice ||
          isResearchTarget != currentPart.isResearchTarget
        )
          await this.updateSetting(
            name,
            minPrice,
            maxPrice,
            isResearchTarget,
            partTypes.name,
          );
      }
    }
    return await this.getAll();
  }

  async getAll(): Promise<PartsEntity[]> {
    return await this.partRepository.find({ relations: { partTypes: true } });
  }

  async updateMarketPrice(
    name: string,
    marketPrice: number,
  ): Promise<PartsEntity | null> {
    const part = await this.getByName(name);
    part.marketPrice = marketPrice;
    return await this.partRepository.save(part);
  }

  async updateSetting(
    name: string,
    minPrice: number,
    maxPrice: number,
    isResearchTarget: boolean,
    partTypeName: string,
  ): Promise<PartsEntity | null> {
    const part = await this.getByName(name);
    const partType = await this.partTypesService.getOneByName(partTypeName);
    if (!part) return null;
    part.name = name;
    part.minPrice = minPrice;
    part.maxPrice = maxPrice;
    part.isResearchTarget = isResearchTarget;
    part.partTypes = partType;
    return await this.partRepository.save(part);
  }

  async delete(partName: string): Promise<boolean> {
    return !!(await this.partRepository.delete({ name: partName }));
  }
}
