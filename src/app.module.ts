import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { TypeormConfigService } from './typeorm-config/typeorm-config.service';
import { MercariModule } from './mercari/mercari.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PartModule } from './part/part.module';
import { DiscordModule as baseDM } from '@discord-nestjs/core';
import { Intents } from 'discord.js';
import { DiscordModule } from './discord/discord.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from './logger/logger.module';

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
    baseDM.forRootAsync({
      useFactory: () => ({
        token:
          'OTkxOTA4NTYxOTA5MTk4OTE4.GzQF6m.s5JMuSKDidz2v1UPRGY9blJ3nlhuRC5fgEVrbU',
        discordClientOptions: {
          intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_VOICE_STATES,
          ],
        },
      }),
    }),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
