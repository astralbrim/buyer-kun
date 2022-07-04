import { PartEntity } from '../../../part/part.entity';
import { ProductType } from '../../../product/product.constant';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnPartDto extends PartEntity {
  @ApiProperty()
  declare name: string;
  @ApiProperty()
  declare maxPrice: number;
  @ApiProperty()
  declare minPrice: number;
  @ApiProperty()
  declare marketPrice?: number;
  @ApiProperty()
  declare type: ProductType;
  @ApiProperty()
  declare id: number;
}
