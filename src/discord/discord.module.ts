import { Module } from '@nestjs/common';
import { DiscordModule as baseDM } from '@discord-nestjs/core';
import { DiscordService } from './discord.service';

@Module({
  providers: [DiscordService],
  imports: [baseDM.forFeature()],
  exports: [DiscordService],
})
export class DiscordModule {}
