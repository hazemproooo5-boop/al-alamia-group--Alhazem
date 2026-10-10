import { prices } from '../data/seed';
import { PriceRecord } from '../types';

export const priceService = {
  getByProductId: (productId: string) => prices.filter((price) => price.productId === productId),
  getLatest: (productId: string): PriceRecord | undefined => {
    const list = prices.filter((price) => price.productId === productId);
    return list.sort((a, b) => new Date(b.priceDate).getTime() - new Date(a.priceDate).getTime())[0];
  },
};
