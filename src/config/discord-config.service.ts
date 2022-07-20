import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  constructor(private settingService: SettingService) {}
  async createDiscordOptions(): Promise<DiscordModuleOption> {
    return {
      token: (await this.settingService.getSetting()).discordToken,
      discordClientOptions: {
        intents: ['GUILD_MESSAGES'],
      },
    };
  }
}
