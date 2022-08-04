import { ProductsEntity } from '../products/products.entity';
import { baseURL } from '../mercari/mercari.constant';
import { MessageEmbed } from 'discord.js';

export class Utils {
  public static createEmbedMessage(product: ProductsEntity): MessageEmbed {
    return new MessageEmbed()
      .setTitle(product.displayName)
      .setURL(baseURL + product.link)
      .addField('パーツ名', product.part.name)
      .addField('値段', product.price.toString())
      .setColor('RANDOM')
      .setTimestamp()
      .setImage(
        `https://static.mercdn.net/c!/w=240,f=webp/thumb/photos/${product.link.slice(
          5,
        )}_1.jpg`,
      )
      .setAuthor({
        url: '',
        name: 'メルカリ',
        iconURL:
          'https://gyazo.com/5b33c81e6bed70180bb126d1b6a8fc35/max_size/400',
      });
  }
}
