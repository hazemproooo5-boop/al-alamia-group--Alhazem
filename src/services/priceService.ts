import { Product } from '../types';
import { products } from '../data/seed';

export const searchService = {
  search: ({ term = '' }: { term?: string } = {}) => {
    const normalized = term.trim().toLowerCase();

    if (!normalized) {
      return products.filter((product) => product.published);
    }

    return products.filter((product) => {
      if (!product.published) return false;
      const haystack = `${product.name} ${product.description} ${product.model} ${product.sourceType}`.toLowerCase();
      return haystack.includes(normalized);
    });
  },
};
