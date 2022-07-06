import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ProductService } from '../../product/product.service';
import { ReturnProductDto } from './dto/return-product.dto';

@Controller('product')
export class ProductController {
  private readonly loggerService = new Logger();
  constructor(private readonly productService: ProductService) {}
  @Get('/')
  async getAllProducts(): Promise<ReturnProductDto[]> {
    this.loggerService.verbose('Get All Product');
    return await this.productService.getAll();
  }

  @Get('/partName/:partName')
  async getProductsByPartName(
    @Param('partName') partName: string,
  ): Promise<ReturnProductDto[]> {
    return await this.productService.getByPartName(partName);
  }
}
