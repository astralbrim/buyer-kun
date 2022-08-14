import { Injectable } from '@nestjs/common';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client, MessageEmbed } from 'discord.js';
import { Utils } from './utils';
import { ProductsEntity } from '../products/products.entity';

@Injectable()
export class DiscordService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  async getTargetChannel(id: string) {
    return this.client.channels.fetch(id);
  }

  async sendMessage(text: string, channelId: string) {
    const channel = await this.getTargetChannel(channelId);
    if (!Utils.isTextChannel(channel)) return;
    await channel.send(text);
  }

  async sendEmbedMessage(embed: MessageEmbed, channelId: string) {
    const channel = await this.getTargetChannel(channelId);
    if (!Utils.isTextChannel(channel)) return;
    await channel.send({ embeds: [embed] });
  }

  async sendProductMessage(product: ProductsEntity, channelId: string) {
    await this.sendEmbedMessage(Utils.createEmbedMessage(product), channelId);
  }
}
