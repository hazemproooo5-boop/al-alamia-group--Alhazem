import { products, prices } from '../data/seed';

export const verificationService = {
  getDataQualitySummary: () => ({
    summary: {
      missingImages: products.filter((product) => !product.imageUrl).length,
      missingSources: products.filter((product) => !product.sourceUrl).length,
      missingSpecs: products.filter((product) => Object.keys(product.specifications).length === 0).length,
      missingWarranty: products.filter((product) => !product.warranty).length,
      stalePrices: prices.filter((price) => new Date(price.priceDate) < new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)).length,
    },
  }),
};

export default verificationService;
