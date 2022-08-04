import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartsService } from '../../parts/parts.service';
import { UpdatePartDto } from './dto/update-part.dto';
import { AddPartDto } from './dto/add-part.dto';
import { ReturnPartDto } from './dto/return-part.dto';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartsService) {}

  @Post('/list')
  async addParts(@Body() body: AddPartDto[]): Promise<ReturnPartDto[]> {
    return await this.partService.addAndUpdate(body);
  }

  @Delete('/:name')
  async deletePart(@Param('name') name: string): Promise<boolean> {
    return await this.partService.delete(name);
  }

  @Patch('/:name')
  async updatePart(
    @Param('name') name: string,
    @Body() body: Omit<UpdatePartDto, 'name'>,
  ): Promise<ReturnPartDto> {
    const { minPrice, maxPrice, isResearchTarget, partTypeName } = body;
    return await this.partService.updateSetting(
      name,
      minPrice,
      maxPrice,
      isResearchTarget,
      partTypeName,
    );
  }

  @Get('/')
  async getAllParts(): Promise<ReturnPartDto[]> {
    return await this.partService.getAll();
  }
}
