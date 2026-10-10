import { PriceRecord, Product } from '../types';
import { getAllProducts } from '../repositories/productRepository';

export type SearchOptions = {
  term?: string;
  brand?: string;
  category?: string;
};

export const searchService = {
  search: (options: SearchOptions = {}) => {
    const list = getAllProducts();
    const term = (options.term ?? '').trim().toLowerCase();

    return list.filter((product: Product) => {
      const matchesTerm = !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.model.toLowerCase().includes(term);

      const matchesBrand = !options.brand || product.brandId === options.brand;
      const matchesCategory = !options.category || product.categoryId === options.category;

      return matchesTerm && matchesBrand && matchesCategory;
    });
  },

  getByPriceRange: (products: Product[], prices: PriceRecord[], min: number, max: number) => products.filter((product) => {
    const target = prices.find((price) => price.productId === product.id)?.price ?? 0;
    return target >= min && target <= max;
  }),
};
