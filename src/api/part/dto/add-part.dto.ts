import { ProductType } from '../../../product/product.constant';
import { ApiProperty } from '@nestjs/swagger';

export class AddPartDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: ProductType;
  x;
  @ApiProperty()
  minPrice: number;
  @ApiProperty()
  maxPrice: number;
}
