import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { baseURL, selector } from './mercari.constant';
import { Utils } from './utils';
import { ProductsEntity } from '../products/products.entity';
import { PartsEntity } from '../parts/parts.entity';

@Injectable()
export class MercariService {
  private browser: Browser;

  private async init(params?: string): Promise<Page> {
    if (!this.browser)
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    const page = await this.browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    );
    await page.goto(baseURL + params);
    return page;
  }

  /**
   * 引数で受け取ったパーツをメルカリで調べる
   * @param part
   * @param soldOut
   **/
  public async getProductInfos(part: PartsEntity, soldOut: boolean) {
    const page = await this.init(
      Utils.createParams(part.maxPrice, part.minPrice, part.name, soldOut),
    );
    await page.waitForSelector(selector.ul);
    const ul = await page.$(selector.ul);
    if (!ul) throw Error();
    const liArray = await ul.$$(selector.li);
    const products: ProductsEntity[] = [];
    for (const li of liArray) {
      const a = await li.$(selector.a);
      const href = await a?.evaluate((elm) => elm.getAttribute('href'));
      const thumbnail = await li.$(selector['thumbnail']);
      const alt = await thumbnail?.evaluate((elm) => {
        return elm.getAttribute('alt');
      });
      const displayName = alt?.slice(0, -6);
      const price = await thumbnail?.evaluate((elm) =>
        elm.getAttribute('price'),
      );
      if (!displayName || !href) return;
      products.push(
        ProductsEntity.create(
          displayName,
          href,
          new Date(),
          Number(price),
          part,
          soldOut,
        ),
      );
    }
    await page.close();
    return products;
  }
}
