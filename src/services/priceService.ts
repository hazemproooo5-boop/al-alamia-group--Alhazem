import { PriceRecord } from '../types';
import { prices } from '../data/seed';

export const priceService = {
  getLatest: (productId: string): PriceRecord | undefined => {
    const now = Date.now();
    const list = prices
      .filter((price) => {
        const ageInDays = (now - new Date(price.priceDate).getTime()) / (1000 * 60 * 60 * 24);
        return price.productId === productId
          && price.verificationStatus === 'Verified'
          && Number.isFinite(ageInDays)
          && ageInDays >= 0
          && ageInDays <= 30;
      })
      .sort((a, b) => new Date(b.priceDate).getTime() - new Date(a.priceDate).getTime());
    return list[0];
  },
};
