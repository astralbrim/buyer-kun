import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { TypeormConfigService } from './config/typeorm-config.service';
import { MercariModule } from './mercari/mercari.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PartModule } from './part/part.module';
import { DiscordModule as baseDM } from '@discord-nestjs/core';
import { DiscordModule } from './discord/discord.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from './logger/logger.module';
import {ConfigModule} from "@nestjs/config";
import {DiscordConfigService} from "./config/discord-config.service";

@Module({
  imports: [
    ProductModule,
    ApiModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    MercariModule,
    SchedulerModule,
    ScheduleModule.forRoot(),
    PartModule,
    DiscordModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({isGlobal: true}),
    baseDM.forRootAsync({
      imports: [ConfigModule],
      useClass: DiscordConfigService,
    }),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
