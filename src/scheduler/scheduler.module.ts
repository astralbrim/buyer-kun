import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DiscordModule } from '../discord/discord.module';
import { DiscordModule as DM } from '@discord-nestjs/core';
import { PartsModule } from '../parts/parts.module';
import { MercariModule } from '../mercari/mercari.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsEntity } from '../parts/parts.entity';
import { ProductsModule } from '../products/products.module';
import { SchedulerManager } from './scheduler.manager';
import { ScheduleModule } from '@nestjs/schedule';
import { SettingModule } from '../setting/setting.module';

@Module({
  exports: [SchedulerService],
  providers: [SchedulerService, SchedulerManager],
  imports: [
    DiscordModule,
    DM.forFeature(),
    MercariModule,
    PartsModule,
    ProductsModule,
    TypeOrmModule.forFeature([PartsEntity]),
    ScheduleModule,
    SettingModule,
  ],
})
export class SchedulerModule {}
