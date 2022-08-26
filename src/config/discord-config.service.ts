import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  constructor(private configService: ConfigService) {}
  async createDiscordOptions(): Promise<DiscordModuleOption> {
    return {
      token: this.configService.get<string>("DISCORD_TOKEN"),
      discordClientOptions: {
        intents: ['GUILD_MESSAGES'],
      },
    };
  }
}
