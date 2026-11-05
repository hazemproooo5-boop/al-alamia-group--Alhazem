import { prices, products } from '../data/seed';

export const verificationService = {
  getDataQualitySummary: () => ({
    summary: {
      missingImages: products.filter((product) => !product.imageUrl).length,
      missingSources: products.filter((product) => !product.sourceUrl).length,
      missingSpecs: products.filter((product) => Object.keys(product.specifications).length === 0).length,
      missingWarranty: products.filter((product) => !product.warranty).length,
      stalePrices: prices.filter((price) => {
        const ageInDays = (Date.now() - new Date(price.priceDate).getTime()) / (1000 * 60 * 60 * 24);
        return !Number.isFinite(ageInDays) || ageInDays < 0 || ageInDays > 30 || price.verificationStatus !== 'Verified';
      }).length,
    },
  }),
};

export default verificationService;
