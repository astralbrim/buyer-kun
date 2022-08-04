import { ApiProperty } from '@nestjs/swagger';
import { PartTypesEntity } from '../../../part-types/part-types.entity';

export class AddPartDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  partType: string;
  @ApiProperty()
  isResearchTarget: boolean;
  @ApiProperty()
  minPrice?: number;
  @ApiProperty()
  maxPrice?: number;
  @ApiProperty()
  partTypes: PartTypesEntity;
}
