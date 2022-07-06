import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SettingEntity } from './setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateSettingEvent } from './event/updateSetting.event';
import { events } from './event/events';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async getSetting(): Promise<SettingEntity> {
    return (
      (await this.settingRepository.find()).at(0) ?? SettingEntity.create()
    );
  }

  async setPriceRatio(ratio: number): Promise<void> {
    const setting = await this.getSetting();
    setting.priceRatio = ratio;
    await this.settingRepository.save(setting);
  }

  async setSearchMarketPriceTimeInterval(
    interval: CronExpression,
  ): Promise<void> {
    const setting = await this.getSetting();
    setting.searchMarketPriceTimeInterval = interval;
    this.eventEmitter.emit(
      events.searchMarketPriceTimeInterval,
      new UpdateSettingEvent(interval),
    );
    await this.settingRepository.save(setting);
  }

  async setPostDiscordTimeInterval(interval: CronExpression): Promise<void> {
    const setting = await this.getSetting();
    setting.postDiscordTimeInterval = interval;
    this.eventEmitter.emit(
      events.postDiscordTimeInterval,
      new UpdateSettingEvent(interval),
    );
    await this.settingRepository.save(setting);
  }

  async setDiscordToken(token: string): Promise<void> {
    const setting = await this.getSetting();
    setting.discordToken = token;
    await this.settingRepository.save(setting);
  }

  async setPostGoodProductInterval(interval: CronExpression): Promise<void> {
    const setting = await this.getSetting();
    setting.postGoodProductInterval = interval;
    this.eventEmitter.emit(
      events.postGoodProductInterval,
      new UpdateSettingEvent(interval),
    );
    await this.settingRepository.save(setting);
  }
}
