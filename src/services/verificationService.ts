import { products } from '../data/seed';

export const verificationService = {
  getDataQualitySummary: () => ({
    summary: {
      missingImages: products.filter((product) => !product.imageUrl).length,
      missingSources: products.filter((product) => !product.sourceUrl).length,
      missingSpecs: products.filter((product) => Object.keys(product.specifications).length === 0).length,
      missingWarranty: products.filter((product) => !product.warranty).length,
      stalePrices: products.filter((product) => product.verificationStatus === 'Unverified').length,
    },
  }),
};

export default verificationService;
