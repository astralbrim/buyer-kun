import { ApiProperty } from '@nestjs/swagger';

export class UpdatePartDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  minPrice: number;
  @ApiProperty()
  maxPrice: number;
}
