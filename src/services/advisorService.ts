import { products, prices } from '../data/seed';

export const verificationService = {
  getDataQualitySummary: () => {
    const missingImages = products.filter((product) => !product.imageUrl).length;
    const missingSources = products.filter((product) => !product.sourceUrl).length;
    const missingSpecs = products.filter((product) => Object.keys(product.specifications).length === 0).length;
    const missingWarranty = products.filter((product) => !product.warranty).length;
    const stalePrices = prices.filter((price) => new Date(price.priceDate) < new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)).length;

    return { missingImages, missingSources, missingSpecs, missingWarranty, stalePrices };
  },
};
