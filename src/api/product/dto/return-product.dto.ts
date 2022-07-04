import { ProductEntity } from '../../../product/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnProductDto extends ProductEntity {
  @ApiProperty()
  declare id: number;

  @ApiProperty()
  declare price: number;

  @ApiProperty()
  declare link: string;

  @ApiProperty()
  declare partName: string;

  @ApiProperty()
  declare soldOut: boolean;

  @ApiProperty()
  declare uploadedAt: Date;

  @ApiProperty()
  declare alreadyNotified: boolean;

  @ApiProperty()
  declare displayName: string;
}
