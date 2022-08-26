import { Check, Column, Entity, PrimaryColumn } from 'typeorm';
import { CronExpression } from '@nestjs/schedule';

@Entity('setting')
/**
 * アプリの設定
 */
@Check(`ensure = 1`)
export class SettingEntity {
  @PrimaryColumn({ type: 'int', default: () => `1`, nullable: false })
  ensure: 1;
  /**
   * どれだけ相場より安いものを通知するか
   */
  @Column({ nullable: false })
  priceRatio: number;

  /**
   * 相場の調査の頻度
   */
  @Column({ nullable: false })
  searchMarketPriceTimeInterval: CronExpression;

  /**
   * 新商品の報告の頻度
   */
  @Column({ nullable: false })
  postGoodProductInterval: CronExpression;

  /**
   * 相場の報告の頻度
   */
  @Column({ nullable: false })
  postDiscordTimeInterval: CronExpression;

  public static create(
    priceRatio: number,
    discordToken: string,
    searchMarketPriceTimeInterval: CronExpression,
    postDiscordTimeInterval: CronExpression,
    postGoodProductInterval: CronExpression
  ): SettingEntity {
    const setting = new SettingEntity();
    setting.ensure = 1;
    setting.searchMarketPriceTimeInterval = searchMarketPriceTimeInterval;
    setting.postDiscordTimeInterval = postDiscordTimeInterval;
    setting.priceRatio = priceRatio;
    setting.postGoodProductInterval = postGoodProductInterval;
    return setting;
  }
}
