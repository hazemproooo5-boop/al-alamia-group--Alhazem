import { products, prices } from '../data/seed';

const PRICE_MAX_AGE_DAYS = 30;

export const verificationService = {
  getDataQualitySummary: () => {
    const publishedProducts = products.filter((product) => product.published);
    const latestPriceByProduct = new Map<string, (typeof prices)[number]>();

    for (const price of prices) {
      const existing = latestPriceByProduct.get(price.productId);
      const priceTimestamp = new Date(price.priceDate).getTime();
      const existingTimestamp = existing ? new Date(existing.priceDate).getTime() : Number.NEGATIVE_INFINITY;
      const comparableTimestamp = Number.isFinite(priceTimestamp) ? priceTimestamp : Number.NEGATIVE_INFINITY;
      const existingComparableTimestamp = Number.isFinite(existingTimestamp)
        ? existingTimestamp
        : Number.NEGATIVE_INFINITY;

      if (!existing || comparableTimestamp > existingComparableTimestamp) {
        latestPriceByProduct.set(price.productId, price);
      }
    }

    let missingPrices = 0;
    let stalePrices = 0;
    let unverifiedPrices = 0;

    for (const product of publishedProducts) {
      const latestPrice = latestPriceByProduct.get(product.id);
      if (!latestPrice) {
        missingPrices += 1;
        continue;
      }

      if (latestPrice.isHistorical || latestPrice.verificationStatus !== 'Verified') {
        unverifiedPrices += 1;
      }

      const timestamp = new Date(latestPrice.priceDate).getTime();
      if (!Number.isFinite(timestamp)) {
        stalePrices += 1;
        continue;
      }

      const ageInDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
      if (ageInDays < 0 || ageInDays > PRICE_MAX_AGE_DAYS) {
        stalePrices += 1;
      }
    }

    return {
      summary: {
        missingImages: publishedProducts.filter((product) => !product.imageUrl).length,
        missingSources: publishedProducts.filter((product) => !product.sourceUrl).length,
        missingSpecs: publishedProducts.filter((product) => Object.keys(product.specifications).length === 0).length,
        missingWarranty: publishedProducts.filter((product) => !product.warranty).length,
        missingPrices,
        stalePrices,
        unverifiedPrices,
      },
    };
  },
};

export default verificationService;
