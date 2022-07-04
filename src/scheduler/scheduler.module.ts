import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DiscordModule } from '../discord/discord.module';
import { DiscordModule as DM } from '@discord-nestjs/core';
import { PartModule } from '../part/part.module';
import { MercariModule } from '../mercari/mercari.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartEntity } from '../part/part.entity';
import { ProductModule } from '../product/product.module';

@Module({
  exports: [SchedulerService],
  providers: [SchedulerService],
  imports: [
    DiscordModule,
    DM.forFeature(),
    MercariModule,
    PartModule,
    ProductModule,
    TypeOrmModule.forFeature([PartEntity]),
  ],
})
export class SchedulerModule {}
