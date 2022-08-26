import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingService } from '../../setting/setting.service';
import { SettingDto } from './dto/setting.dto';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
  @Get()
  async getSetting() {
    return await this.settingService.getSetting();
  }
  @Post()
  async setSetting(@Body() body: SettingDto): Promise<void> {
    const {
      postDiscordTimeInterval,
      searchMarketPriceTimeInterval,
      priceRatio,
      postGoodProductInterval,
    } = body;
    if (postDiscordTimeInterval)
      await this.settingService.setPostDiscordTimeInterval(
        postDiscordTimeInterval,
      );
    if (searchMarketPriceTimeInterval)
      await this.settingService.setSearchMarketPriceTimeInterval(
        searchMarketPriceTimeInterval,
      );
    if (priceRatio) await this.settingService.setPriceRatio(priceRatio);
    if (postGoodProductInterval)
      await this.settingService.setPostGoodProductInterval(
        postGoodProductInterval,
      );
  }
}
