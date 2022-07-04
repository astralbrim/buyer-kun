import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { baseURL, selector } from './mercari.constant';
import { Utils } from './utils';
import { ProductEntity } from '../product/product.entity';
import { PartEntity } from '../part/part.entity';

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
  public async getProductInfos(part: PartEntity, soldOut: boolean) {
    const page = await this.init(
      Utils.createParams(part.maxPrice, part.minPrice, part.name, soldOut),
    );
    await page.waitForSelector(selector.ul);
    const ul = await page.$(selector.ul);
    if (!ul) throw Error();
    const liArray = await ul.$$(selector.li);
    const products: ProductEntity[] = [];
    for (const li of liArray) {
      const a = await li.$(selector.a);
      const href = await a.evaluate((elm) => elm.getAttribute('href'));
      const thumbnail = await li.$(selector['thumbnail']);
      const displayName = (
        await thumbnail.evaluate((elm) => elm.getAttribute('alt'))
      ).slice(0, -6);
      const price = await thumbnail.evaluate((elm) =>
        elm.getAttribute('price'),
      );
      products.push(
        ProductEntity.create(
          displayName,
          href,
          new Date(),
          Number(price),
          part.name,
          soldOut,
        ),
      );
    }
    await page.close();
    return products;
  }
}
