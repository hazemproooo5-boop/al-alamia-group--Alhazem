import { NeedProfile, Product } from '../types';
import { products } from '../data/seed';
import { priceService } from './priceService';

export const advisorService = {
  recommend: (profile: NeedProfile): { products: Product[]; explanations: string[] } => {
    const budget = profile.budget ?? Number.MAX_SAFE_INTEGER;
    const filtered = products.filter((product) => {
      if (!product.published) return false;
      const matchesCategory = profile.category === 'all' || product.categoryId === profile.category;
      const currentPrice = priceService.getCurrent(product.id);

      // A missing or stale price cannot be treated as evidence that a product
      // fits the customer's budget.
      return matchesCategory && currentPrice?.verificationStatus === 'Verified' && currentPrice.price <= budget;
    });

    const ordered = [...filtered].sort((a, b) => {
      const aPrice = priceService.getCurrent(a.id)?.price ?? Number.MAX_SAFE_INTEGER;
      const bPrice = priceService.getCurrent(b.id)?.price ?? Number.MAX_SAFE_INTEGER;
      return aPrice - bPrice;
    });

    const categoryProducts = products.filter((product) =>
      product.published && (profile.category === 'all' || product.categoryId === profile.category)
    );
    const withoutCurrentPrice = categoryProducts.filter((product) => priceService.getCurrent(product.id)?.verificationStatus !== 'Verified').length;

    const explanations = [
      `تم تطبيق ميزانيتك بحد أقصى ${budget.toLocaleString()} جنيه`,
      'لا تظهر التوصية إلا للمنتجات التي لها سعر حديث موثق بالكامل وداخل الميزانية',
      withoutCurrentPrice
        ? `هناك ${withoutCurrentPrice} منتج/منتجات في الفئة دون سعر حديث موثق بالكامل؛ لم نحتسبها ضمن المطابقة حتى لا نعطيك تقديراً مضللاً`
        : 'تمت مراجعة حداثة الأسعار المسجلة قبل المطابقة',
      profile.occupants ? `تم تسجيل عدد السكان (${profile.occupants}) ضمن ملف الاحتياج` : 'تمت مراجعة الفئة والميزانية',
    ];

    return { products: ordered.slice(0, 4), explanations };
  },
};
