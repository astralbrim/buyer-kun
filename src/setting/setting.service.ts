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
    return (await this.settingRepository.find()).at(0);
  }

  async setPriceRatio(ratio: number): Promise<number> {
    const setting = await this.getSetting();
    setting.priceRatio = ratio;
    return (await this.settingRepository.save(setting)).priceRatio;
  }

  async setSearchMarketPriceTimeInterval(
    interval: CronExpression,
  ): Promise<string> {
    const setting = await this.getSetting();
    setting.searchMarketPriceTimeInterval = interval;
    this.eventEmitter.emit(
      events.searchMarketPriceTimeInterval,
      new UpdateSettingEvent(interval),
    );
    return (await this.settingRepository.save(setting)).searchMarketPriceTimeInterval;
  }

  async setPostDiscordTimeInterval(interval: CronExpression): Promise<string> {
    const setting = await this.getSetting();
    setting.postDiscordTimeInterval = interval;
    this.eventEmitter.emit(
      events.postDiscordTimeInterval,
      new UpdateSettingEvent(interval),
    );
    return (await this.settingRepository.save(setting)).postDiscordTimeInterval;
  }

  async setPostGoodProductInterval(interval: CronExpression): Promise<string> {
    const setting = await this.getSetting();
    setting.postGoodProductInterval = interval;
    this.eventEmitter.emit(
      events.postGoodProductInterval,
      new UpdateSettingEvent(interval),
    );
    return (await this.settingRepository.save(setting)).postGoodProductInterval;
  }
}
