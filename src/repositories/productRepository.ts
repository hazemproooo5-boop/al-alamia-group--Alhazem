import { brands, products, prices, news, tips, suppliers, offers, academyItems, faqs, competitions, auditLog, siteSettings } from './seed';

export const getBrandBySlug = (slug: string) => brands.find((brand) => brand.slug === slug);
export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);
export const getProductsByBrand = (brandId: string) => products.filter((product) => product.brandId === brandId);
export const getAllProducts = () => products;
export const getLatestPrices = () => prices;
export const getAllNews = () => news;
export const getAllTips = () => tips;
export const getSiteSettings = () => siteSettings;
export const getSuppliers = () => suppliers;
export const getOffers = () => offers;
export const getAcademy = () => academyItems;
export const getFaqs = () => faqs;
export const getCompetitions = () => competitions;
export const getAuditLog = () => auditLog;

export { brands, products, prices, news, tips, suppliers, offers, academyItems, faqs, competitions, auditLog, siteSettings };
