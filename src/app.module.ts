import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { TypeormConfigService } from './config/typeorm-config.service';
import { MercariModule } from './mercari/mercari.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PartsModule } from './parts/parts.module';
import { DiscordModule as baseDM } from '@discord-nestjs/core';
import { DiscordModule } from './discord/discord.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { DiscordConfigService } from './config/discord-config.service';
import { SettingModule } from './setting/setting.module';
import { RouterModule } from 'nest-router';
import { StockModule } from './stock/stock.module';
import { PartTypesModule } from './part-types/part-types.module';

const routes = [
  {
    path: '/api',
    module: ApiModule,
  },
];
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ProductsModule,
    ApiModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    MercariModule,
    SchedulerModule,
    ScheduleModule.forRoot(),
    PartsModule,
    DiscordModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    baseDM.forRootAsync({
      imports: [ConfigModule],
      useClass: DiscordConfigService,
    }),
    LoggerModule,
    SettingModule,
    StockModule,
    PartTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
