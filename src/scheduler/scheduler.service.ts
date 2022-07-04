import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiscordService } from '../discord/discord.service';
import { MercariService } from '../mercari/mercari.service';
import { PartService } from '../part/part.service';
import { Utils as MUtils } from '../mercari/utils';
import { ProductService } from '../product/product.service';
import { PRICE_RATIO } from './scheduler.constant';
import { Channel } from '../discord/discord.constant';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SchedulerService {
  private time: number;

  constructor(
    private readonly discordService: DiscordService,
    private readonly mercariService: MercariService,
    private readonly partService: PartService,
    private readonly productService: ProductService,
  ) {
    this.time = 0;
  }

  /**
   * 相場の取得
   */
  @Cron(CronExpression.EVERY_HOUR)
  @OnEvent('part.add', { async: false })
  async getMarketPlace() {
    // 全てのパーツ
    const parts = await this.partService.getAll();
    for (const part of parts) {
      const soldOutProducts = await this.mercariService.getProductInfos(
        part,
        true,
      );
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
  @Cron(CronExpression.EVERY_30_MINUTES)
  async getGoodProduct() {
    const newParts = await this.partService.getAll();
    for (const part of newParts) {
      // 販売中の商品の取得
      const onSaleProducts = await this.mercariService.getProductInfos(
        part,
        false,
      );
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
        if (product.alreadyNotified) return;
        if (product.price < part.marketPrice * PRICE_RATIO) {
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
  @Cron(CronExpression.EVERY_3_HOURS)
  async postMarketPrice() {
    const parts = await this.partService.getAll();
    parts.forEach((part) => {
      this.discordService.sendMessage(
        `**${part.name}**の相場: ${Math.round(part.marketPrice)}円`,
        Channel.MARKET_PRICE,
      );
    });
  }
}
