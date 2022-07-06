import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DiscordModule } from '../discord/discord.module';
import { DiscordModule as DM } from '@discord-nestjs/core';
import { PartModule } from '../part/part.module';
import { MercariModule } from '../mercari/mercari.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartEntity } from '../part/part.entity';
import { ProductModule } from '../product/product.module';
import { SchedulerManager } from './scheduler.manager';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  exports: [SchedulerService],
  providers: [SchedulerService, SchedulerManager],
  imports: [
    DiscordModule,
    DM.forFeature(),
    MercariModule,
    PartModule,
    ProductModule,
    TypeOrmModule.forFeature([PartEntity]),
    ScheduleModule,
  ],
})
export class SchedulerModule {}
