import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    const configService = new ConfigService();
    return {
      token: configService.get<string>('DISCORD_TOKEN'),
      discordClientOptions: {
        intents: ['GUILD_MESSAGES'],
      },
    };
  }
}
