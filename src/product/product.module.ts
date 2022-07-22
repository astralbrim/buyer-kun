import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { PartModule } from '../part/part.module';
import { PartService } from '../part/part.service';
import { PartEntity } from '../part/part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PartEntity]), PartModule],
  providers: [ProductService, PartService],
  exports: [ProductService],
})
export class ProductModule {}
