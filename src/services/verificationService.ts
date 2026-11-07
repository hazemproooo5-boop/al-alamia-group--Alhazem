import { products, prices } from '../data/seed';

const PRICE_MAX_AGE_DAYS = 30;

export const verificationService = {
  getDataQualitySummary: () => {
    const latestPriceByProduct = new Map<string, string>();
    for (const price of prices) {
      const existing = latestPriceByProduct.get(price.productId);
      if (!existing || new Date(price.priceDate).getTime() > new Date(existing).getTime()) {
        latestPriceByProduct.set(price.productId, price.priceDate);
      }
    }

    const stalePrices = products.filter((product) => {
      const priceDate = latestPriceByProduct.get(product.id);
      if (!priceDate) return false;
      const timestamp = new Date(priceDate).getTime();
      if (!Number.isFinite(timestamp)) return true;
      const ageInDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
      return ageInDays < 0 || ageInDays > PRICE_MAX_AGE_DAYS;
    }).length;

    return {
      summary: {
        missingImages: products.filter((product) => !product.imageUrl).length,
        missingSources: products.filter((product) => !product.sourceUrl).length,
        missingSpecs: products.filter((product) => Object.keys(product.specifications).length === 0).length,
        missingWarranty: products.filter((product) => !product.warranty).length,
        stalePrices,
      },
    };
  },
};

export default verificationService;
