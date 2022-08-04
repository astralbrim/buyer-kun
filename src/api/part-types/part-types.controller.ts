import { Body, Controller, Get, Post } from '@nestjs/common';
import { PartTypesService } from '../../part-types/part-types.service';
import { AddPartTypesDto } from './dto/add-part-types.dto';

@Controller('part-types')
export class PartTypesController {
  constructor(private readonly partTypesService: PartTypesService) {}

  @Post('/list')
  async addPartTypes(@Body() body: AddPartTypesDto[]) {
    const names = body.map((dto) => dto.name);
    return await this.partTypesService.addAndDelete(names);
  }

  @Get('/')
  async getAllPartTypes() {
    return await this.partTypesService.getAll();
  }
}
