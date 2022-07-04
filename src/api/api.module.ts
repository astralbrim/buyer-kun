import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/product.entity';
import { MercariModule } from '../mercari/mercari.module';
import { PartModule } from '../part/part.module';
import { PartEntity } from '../part/part.entity';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { PartController } from './part/part.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forFeature([ProductEntity, PartEntity]),
    MercariModule,
    PartModule,
    SchedulerModule,
    ],
  providers: [ProductService],
  controllers: [PartController, ProductController],
})
export class ApiModule {}
