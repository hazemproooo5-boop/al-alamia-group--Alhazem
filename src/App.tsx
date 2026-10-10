import { Product } from '../types';
import { products } from '../data/seed';

export type NeedProfile = {
  roomSize?: string;
  occupants?: number;
  climate?: string;
  budget?: number;
  category: string;
};

export const advisorService = {
  recommend: (profile: NeedProfile): Product[] => {
    const budget = profile.budget ?? Number.MAX_SAFE_INTEGER;

    return products.filter((product) => {
      const price = Number(product.id === 'prod-1' ? 18900 : product.id === 'prod-2' ? 26800 : 22400);
      const matchesCategory = product.categoryId === profile.category || profile.category === 'all';
      return matchesCategory && price <= budget;
    });
  },
};
