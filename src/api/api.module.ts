import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from '../products/products.entity';
import { MercariModule } from '../mercari/mercari.module';
import { PartsModule } from '../parts/parts.module';
import { PartsEntity } from '../parts/parts.entity';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { PartController } from './part/part.controller';
import { ProductsController } from './products/products.controller';
import { SettingController } from './setting/setting.controller';
import { SettingEntity } from '../setting/setting.entity';
import { SettingModule } from '../setting/setting.module';
import { PartTypesController } from './part-types/part-types.controller';
import { PartTypesModule } from '../part-types/part-types.module';
import { PartTypesEntity } from '../part-types/part-types.entity';
import { PartTypesService } from '../part-types/part-types.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([
      ProductsEntity,
      PartsEntity,
      SettingEntity,
      PartTypesEntity,
    ]),
    MercariModule,
    PartsModule,
    SchedulerModule,
    SettingModule,
    PartTypesModule,
  ],
  providers: [ProductsService, PartTypesService],
  controllers: [
    PartController,
    ProductsController,
    SettingController,
    PartTypesController,
  ],
})
export class ApiModule {}
