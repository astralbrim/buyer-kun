import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiscordService } from '../discord/discord.service';
import { MercariService } from '../mercari/mercari.service';
import { PartService } from '../part/part.service';
import { Utils as MUtils } from '../mercari/utils';
import { ProductService } from '../product/product.service';
import { CRON_JOB } from './scheduler.constant';
import { Channel } from '../discord/discord.constant';
import { OnEvent } from '@nestjs/event-emitter';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class SchedulerService {
  private time: number;
  private readonly loggerService = new Logger();

  constructor(
    private readonly discordService: DiscordService,
    private readonly mercariService: MercariService,
    private readonly partService: PartService,
    private readonly productService: ProductService,
    private readonly settingService: SettingService,
  ) {
    this.time = 0;
  }

  /**
   * 相場の取得
   */
  @Cron(CronExpression.EVERY_HOUR, { name: CRON_JOB.GET_MARKET_PRICE })
  @OnEvent('part.add', { async: false })
  async getMarketPlace() {
    this.loggerService.log('相場の調査を開始');
    // 全てのパーツ
    const parts = await this.partService.getAll();
    for (const part of parts) {
      const soldOutProducts = await this.mercariService.getProductInfos(
        part,
        true,
      );
      if (!soldOutProducts) return;
      const currentProducts = await this.productService.getAll();
      // 重複がない配列にする。
      const nonDuplicateArray = ProductService.toNonDuplicateArray(
        currentProducts,
        soldOutProducts,
      );
      // 関係のない商品の削除
      const filteredArray = ProductService.filterProducts(nonDuplicateArray);
      if (filteredArray.length === 0) {
        continue;
      }
      await this.productService.addProducts(filteredArray);
      // 相場の計算
      const marketPrice = MUtils.calcMarketPrice(filteredArray);
      // 相場の保存
      await this.partService.updateMarketPrice(part.name, marketPrice);
    }
  }

  /**
   * いい商品を取得し報告する
   */
  @Cron(CronExpression.EVERY_30_MINUTES, { name: CRON_JOB.POST_GOOD_PRODUCT })
  async postGoodProduct() {
    this.loggerService.log('いい商品を見つけてきます');
    const { priceRatio } = await this.settingService.getSetting();
    const newParts = await this.partService.getAll();
    for (const part of newParts) {
      // 販売中の商品の取得
      const onSaleProducts = await this.mercariService.getProductInfos(
        part,
        false,
      );
      if (!onSaleProducts) return;
      const currentProducts = await this.productService.getAll();
      const nonDuplicateArray = ProductService.toNonDuplicateArray(
        currentProducts,
        onSaleProducts,
      );
      const filteredArray = ProductService.filterProducts(nonDuplicateArray);
      if (filteredArray.length === 0) {
        continue;
      }
      await this.productService.addProducts(filteredArray);
      for (const product of filteredArray) {
        if (product.alreadyNotified || !part.marketPrice) return;
        if (product.price < part.marketPrice * priceRatio) {
          await this.discordService.sendProductMessage(
            product,
            Channel.PRODUCT,
          );
          await this.productService.updateAlreadyNotified(product);
        }
      }
    }
  }

  /**
   * 相場をディスコードに報告
   */
  @Cron(CronExpression.EVERY_3_HOURS, { name: CRON_JOB.POST_MARKET_PRICE })
  async postMarketPrice() {
    this.loggerService.log('相場をディスコードに報告します。');
    const parts = await this.partService.getAll();
    parts.forEach((part) => {
      if (!part.marketPrice) return;
      this.discordService.sendMessage(
        `**${part.name}**の相場: ${Math.round(part.marketPrice)}円`,
        Channel.MARKET_PRICE,
      );
    });
  }
}
