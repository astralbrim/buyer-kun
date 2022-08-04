import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartTypesEntity } from './part-types.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartTypesService {
  constructor(
    @InjectRepository(PartTypesEntity)
    private readonly partTypesRepository: Repository<PartTypesEntity>,
  ) {}

  async create(name: string) {
    const partTypes = PartTypesEntity.create(name);
    return await this.partTypesRepository.save(partTypes);
  }

  async delete(name: string): Promise<boolean> {
    return !!(await this.partTypesRepository.delete({ name }));
  }

  async getOneByName(name: string): Promise<PartTypesEntity | null> {
    return await this.partTypesRepository.findOneByOrFail({ name });
  }

  async getAll(): Promise<PartTypesEntity[]> {
    return await this.partTypesRepository.find();
  }

  async addAndDelete(names: string[]): Promise<PartTypesEntity[]> {
    const currents = await this.getAll();
    const newPartTypes = names.filter((name) => {
      return currents.every((current) => current.name != name);
    });
    const deletedPartTypes = currents.filter((current) => {
      let isDeleted = true;
      names.forEach((name) => {
        if (name == current.name) isDeleted = false;
      });
      return isDeleted;
    });

    for (const newPartType of newPartTypes) {
      await this.create(newPartType);
    }

    for (const deletedPartType of deletedPartTypes) {
      await this.delete(deletedPartType.name);
    }

    return await this.getAll();
  }
}
