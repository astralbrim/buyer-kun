import { ApiProperty } from '@nestjs/swagger';
import {ProductType} from "../../../product/product.constant";

export class UpdatePartDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  minPrice: number;
  @ApiProperty()
  maxPrice: number;
  @ApiProperty()
  type: ProductType;
}
