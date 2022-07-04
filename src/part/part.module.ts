import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartEntity } from './part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartEntity])],
  exports: [PartService],
  providers: [PartService],
})
export class PartModule {}
