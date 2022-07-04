import { Injectable } from '@nestjs/common';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client, MessageEmbed, TextChannel } from 'discord.js';
import { Utils } from './utils';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class DiscordService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  async getTargetChannel(id: string) {
    return this.client.channels.cache.get(id);
  }

  async sendMessage(text: string, channelId: string) {
    const channel = await this.getTargetChannel(channelId);
    if (!(channel instanceof TextChannel)) return;
    await channel.send(text);
  }

  async sendEmbedMessage(embed: MessageEmbed, channelId: string) {
    const channel = await this.getTargetChannel(channelId);
    if (!(channel instanceof TextChannel)) return;
    await channel.send({ embeds: [embed] });
  }

  async sendProductMessage(product: ProductEntity, channelId: string) {
    await this.sendEmbedMessage(Utils.createEmbedMessage(product), channelId);
  }
}
