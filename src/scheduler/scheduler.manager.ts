import { SchedulerRegistry } from '@nestjs/schedule';
import { OnEvent } from '@nestjs/event-emitter';
import { CRON_JOB } from './scheduler.constant';
import { UpdateSettingEvent } from '../setting/event/updateSetting.event';
import { Injectable, Logger } from '@nestjs/common';
import { CronTime } from 'cron';
import { events } from '../setting/event/events';

@Injectable()
export class SchedulerManager {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  logger: Logger = new Logger('Scheduler');

  @OnEvent(events.searchMarketPriceTimeInterval)
  async onUpdateSearchMarketPriceTimeInterval(payload: UpdateSettingEvent) {
    const job = this.schedulerRegistry.getCronJob(CRON_JOB.GET_MARKET_PRICE);
    job.setTime(new CronTime(payload.param));
    this.logger.log(`相場の調査時間の間隔が ${payload.param} に設定されました`);
  }

  @OnEvent(events.postDiscordTimeInterval)
  async onUpdatePostDiscordTimeInterval(payload: UpdateSettingEvent) {
    const job = this.schedulerRegistry.getCronJob(CRON_JOB.POST_MARKET_PRICE);
    job.setTime(new CronTime(payload.param));
    this.logger.log(
      `ディスコードに相場を送信する時間の間隔が${payload.param}に設定されました`,
    );
  }

  @OnEvent(events.postGoodProductInterval)
  async onUpdatePostGoodProductInterval(payload: UpdateSettingEvent) {
    const job = this.schedulerRegistry.getCronJob(CRON_JOB.POST_GOOD_PRODUCT);
    job.setTime(new CronTime(payload.param));
    this.logger.log(
      `ディスコードに相場より価格が低い商品を送信する時間の間隔が ${payload.param} に設定されました`,
    );
  }
}
