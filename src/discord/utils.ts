import { ProductEntity } from '../product/product.entity';
import { baseURL } from '../mercari/mercari.constant';
import { MessageEmbed } from 'discord.js';

export class Utils {
  public static createEmbedMessage(product: ProductEntity): MessageEmbed {
    return new MessageEmbed()
      .setTitle(product.displayName)
      .setURL(baseURL + product.link)
      .addField('パーツ名', product.partName)
      .addField('値段', product.price.toString())
      .setColor('RANDOM')
      .setTimestamp()
      .setImage(
        `https://static.mercdn.net/c!/w=240,f=webp/thumb/photos/${product.link.slice(
          5,
        )}_1.jpg`,
      )
      .setAuthor({
        url: null,
        name: 'メルカリ',
        iconURL:
          'https://gyazo.com/5b33c81e6bed70180bb126d1b6a8fc35/max_size/400',
      });
  }
}
