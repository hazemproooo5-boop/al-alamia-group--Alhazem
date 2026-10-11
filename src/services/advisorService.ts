import { PriceRecord } from '../types';
import { prices } from '../data/seed';

export const priceService = {
  getLatest: (productId: string): PriceRecord | undefined => {
    const list = prices.filter((price) => price.productId === productId);
    return list.sort((a, b) => new Date(b.priceDate).getTime() - new Date(a.priceDate).getTime())[0];
  },
};
