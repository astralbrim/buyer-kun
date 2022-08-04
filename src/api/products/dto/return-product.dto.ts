import { ApiProperty } from '@nestjs/swagger';
import { PartsEntity } from '../../../parts/parts.entity';

export class ReturnProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  link: string;

  @ApiProperty()
  isSoldOut: boolean;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isAlreadyNotified: boolean;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  part: PartsEntity;

  @ApiProperty()
  createdAt: Date;
}
