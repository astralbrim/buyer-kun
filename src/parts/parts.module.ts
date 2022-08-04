import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsEntity } from './parts.entity';
import { PartTypesEntity } from '../part-types/part-types.entity';
import { PartTypesModule } from '../part-types/part-types.module';
import { PartTypesService } from '../part-types/part-types.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartsEntity, PartTypesEntity]),
    PartTypesModule,
  ],
  exports: [PartsService],
  providers: [PartsService, PartTypesService],
})
export class PartsModule {}
