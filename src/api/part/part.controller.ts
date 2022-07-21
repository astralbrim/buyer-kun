import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartService } from '../../part/part.service';
import { UpdatePartDto } from './dto/update-part.dto';
import { AddPartDto } from './dto/add-part.dto';
import { ReturnPartDto } from './dto/return-part.dto';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post('/')
  async addPart(@Body() body: AddPartDto[]): Promise<ReturnPartDto[]> {
    return await this.partService.add(body);
  }

  @Delete('/:partName')
  async deletePart(@Param('partName') partName: string): Promise<boolean> {
    return await this.partService.delete(partName);
  }

  @Patch('/')
  async updatePart(@Body() body: UpdatePartDto): Promise<ReturnPartDto> {
    const { name, minPrice, maxPrice } = body;
    return await this.partService.updateSetting(name, minPrice, maxPrice);
  }

  @Get('/')
  async getAllPart(): Promise<ReturnPartDto[]> {
    return await this.partService.getAll();
  }
}
