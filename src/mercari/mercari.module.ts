import { Module } from '@nestjs/common';
import { MercariService } from './mercari.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  providers: [MercariService],
  exports: [MercariService],
})
export class MercariModule {}
