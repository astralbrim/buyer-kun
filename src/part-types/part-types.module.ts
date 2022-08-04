import { Module } from '@nestjs/common';
import { PartTypesService } from './part-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartTypesEntity } from './part-types.entity';

@Module({
  providers: [PartTypesService],
  imports: [TypeOrmModule.forFeature([PartTypesEntity])],
})
export class PartTypesModule {}
