import { Module } from '@nestjs/common';
import { MercariService } from './mercari.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [MercariService],
  exports: [MercariService],
})
export class MercariModule {}
