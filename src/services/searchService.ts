import { Product } from '../types';
import { brands, products } from '../data/seed';

const normalize = (value: string): string =>
  value
    .toLocaleLowerCase('ar')
    .normalize('NFD')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ـ/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

const categoryAliases: Record<string, string[]> = {
  ac: ['تكييف', 'تكييفات', 'مكيف', 'مكيفات', 'air conditioner', 'air conditioning'],
  appliances: ['اجهزه', 'اجهزه كهربائيه', 'اجهزه منزليه', 'غساله', 'ثلاجه'],
  kitchen: ['مطبخ', 'مطبخيه', 'فرن', 'ادوات مطبخ'],
};

const brandAliases: Record<string, string[]> = {
  samsung: ['سامسونج'],
  lg: ['ال جي', 'ال جيه'],
  bosch: ['بوش'],
  beko: ['بيكو'],
  aux: ['اكس', 'aux'],
};

const searchableText = (product: Product): string => {
  const brand = brands.find((item) => item.id === product.brandId);
  const aliases = [
    ...(categoryAliases[product.categoryId] ?? []),
    ...(brandAliases[product.brandId] ?? []),
  ];
  return normalize([
    product.name,
    product.description,
    product.model,
    product.sku,
    product.categoryId,
    product.brandId,
    brand?.name ?? '',
    ...aliases,
  ].join(' '));
};

export const searchService = {
  search: ({ term = '' }: { term?: string } = {}) => {
    const normalized = normalize(term);
    if (!normalized) return products.filter((product) => product.published);

    const terms = normalized.split(/\s+/).filter(Boolean);
    return products.filter((product) => {
      if (!product.published) return false;
      const haystack = searchableText(product);
      return terms.every((word) => haystack.includes(word));
    });
  },
};
