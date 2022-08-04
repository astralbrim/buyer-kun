import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';
import { PartsModule } from '../parts/parts.module';
import { PartsService } from '../parts/parts.service';
import { PartsEntity } from '../parts/parts.entity';
import { PartTypesEntity } from '../part-types/part-types.entity';
import { PartTypesModule } from '../part-types/part-types.module';
import { PartTypesService } from '../part-types/part-types.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, PartsEntity, PartTypesEntity]),
    PartsModule,
    PartTypesModule,
  ],
  providers: [ProductsService, PartsService, PartTypesService],
  exports: [ProductsService],
})
export class ProductsModule {}
