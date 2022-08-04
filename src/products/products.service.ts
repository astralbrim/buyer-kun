import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './products.entity';
import { PartsEntity } from '../parts/parts.entity';
import { PartsService } from '../parts/parts.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
    private readonly partService: PartsService,
  ) {}

  async addProduct(
    link: string,
    displayName: string,
    uploadedAt: Date,
    price: number,
    part: PartsEntity,
    soldOut: boolean,
  ): Promise<ProductsEntity> {
    const product = ProductsEntity.create(
      displayName,
      link,
      uploadedAt,
      price,
      part,
      soldOut,
    );
    return await this.productRepository.save(product);
  }
  async addProducts(products: ProductsEntity[]): Promise<ProductsEntity[]> {
    return await this.productRepository.save(products);
  }

  async getAll(): Promise<ProductsEntity[]> {
    return await this.productRepository.find();
  }

  async getByPartName(partName: string): Promise<ProductsEntity[]> {
    const part = await this.partService.getByName(partName);
    return await this.productRepository.findBy({ part });
  }

  async getById(id: number): Promise<ProductsEntity | null> {
    return await this.productRepository.findOneBy({ id });
  }

  async deleteById(id: number) {
    return await this.productRepository.delete(id);
  }

  async updateAlreadyNotified(
    product: ProductsEntity,
  ): Promise<ProductsEntity> {
    product.isAlreadyNotified = true;
    return await this.productRepository.save(product);
  }

  public static toNonDuplicateArray(
    baseProducts: ProductsEntity[],
    newProducts: ProductsEntity[],
  ) {
    return newProducts.filter((newProduct) => {
      for (const baseProduct of baseProducts) {
        if (baseProduct.link === newProduct.link) {
          return baseProduct.price != newProduct.price;
        }
      }
      return true;
    });
  }

  public static filterProducts(products: ProductsEntity[]) {
    return products.filter((product) => {
      return this.isCorrectProduct(product);
    });
  }

  public static isCorrectProduct(product: ProductsEntity) {
    const hankakuPartName = this.zenkakuToHankaku(product.displayName);
    const notIncludeSpace = this.toNotIncludeSpace(hankakuPartName);
    const reg = new RegExp(product.part.name, 'i');
    return !!notIncludeSpace.match(reg);
  }

  public static toNotIncludeSpace(str: string) {
    return str.replaceAll(/(\s|　)+/g, '');
  }

  public static zenkakuToHankaku(str: string) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  }
}
