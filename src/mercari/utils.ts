import { ProductEntity } from '../product/product.entity';

export class Utils {
  public static createParams(
    max: number,
    min: number,
    productName: string,
    soldOut: boolean,
  ) {
    return `/search?keyword=${productName}&price_max=${max}&price_min=${min}&sort=sort_created_time&status=${
      soldOut ? 'sold_out' : 'on_sale'
    }`;
  }

  public static calcMarketPrice(products: ProductEntity[]): number {
    let sum = 0;
    products.forEach((product) => {
      sum += product.price;
    });
    return sum / products.length + 1;
  }
}
