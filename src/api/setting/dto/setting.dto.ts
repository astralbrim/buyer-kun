import { CronExpression } from '@nestjs/schedule';
import { ApiProperty } from '@nestjs/swagger';

export class SettingDto {
  @ApiProperty()
  discordToken?: string;
  @ApiProperty()
  postDiscordTimeInterval?: CronExpression;
  @ApiProperty()
  priceRatio?: number;
  @ApiProperty()
  searchMarketPriceTimeInterval?: CronExpression;
  @ApiProperty()
  postGoodProductInterval?: CronExpression;
}
