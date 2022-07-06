import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingEntity } from './setting.entity';

@Module({
  providers: [SettingService],
  exports: [SettingService],
  imports: [TypeOrmModule.forFeature([SettingEntity])],
})
export class SettingModule {}
