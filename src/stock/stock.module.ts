import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [StockService],
  imports: [TypeOrmModule.forFeature([])],
})
export class StockModule {}
