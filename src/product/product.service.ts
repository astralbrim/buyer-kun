import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async addProduct(
    link: string,
    displayName: string,
    uploadedAt: Date,
    price: number,
    partName: string,
    soldOut: boolean,
  ): Promise<ProductEntity> {
    const product = ProductEntity.create(
      displayName,
      link,
      uploadedAt,
      price,
      partName,
      soldOut,
    );
    return await this.productRepository.save(product);
  }
  async addProducts(products: ProductEntity[]): Promise<ProductEntity[]> {
    return await this.productRepository.save(products);
  }

  async getAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getByPartName(partName: string): Promise<ProductEntity[]> {
    return await this.productRepository.findBy({ partName });
  }

  async getById(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOneBy({ id });
  }

  async deleteById(id: number) {
    return await this.productRepository.delete(id);
  }

  async updateAlreadyNotified(product: ProductEntity): Promise<ProductEntity> {
    product.alreadyNotified = true;
    return await this.productRepository.save(product);
  }

  public static toNonDuplicateArray(
    baseProducts: ProductEntity[],
    newProducts: ProductEntity[],
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

  public static filterProducts(products: ProductEntity[]) {
    return products.filter((product) => {
      return this.isCorrectProduct(product);
    });
  }

  public static isCorrectProduct(product: ProductEntity) {
    const hankakuPartName = this.zenkakuToHankaku(product.displayName);
    const notIncludeSpace = this.toNotIncludeSpace(hankakuPartName);
    const reg = new RegExp(product.partName, 'i');
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
