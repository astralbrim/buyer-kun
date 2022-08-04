import { ApiProperty } from '@nestjs/swagger';
import { PartTypesEntity } from '../../../part-types/part-types.entity';

export class ReturnPartDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  maxPrice?: number;
  @ApiProperty()
  minPrice?: number;
  @ApiProperty()
  marketPrice?: number;
  @ApiProperty()
  partTypes: PartTypesEntity;
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  isResearchTarget: boolean;
  @ApiProperty()
  updatedAt: Date;
}
