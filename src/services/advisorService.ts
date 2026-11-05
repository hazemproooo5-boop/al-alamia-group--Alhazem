import { NeedProfile, Product } from '../types';
import { products } from '../data/seed';
import { priceService } from './priceService';

export const advisorService = {
  recommend: (profile: NeedProfile): { products: Product[]; explanations: string[] } => {
    const categoryMatches = products.filter((product) => {
      if (!product.published || product.verificationStatus !== 'Verified') return false;
      return profile.category === 'all' || product.categoryId === profile.category;
    });

    const pricedMatches = categoryMatches.filter((product) => {
      if (profile.budget === undefined) return true;
      const latest = priceService.getLatest(product.id);
      return Boolean(latest && latest.price <= profile.budget);
    });

    const ordered = [...pricedMatches].sort((a, b) => {
      const aPrice = priceService.getLatest(a.id)?.price ?? Number.MAX_SAFE_INTEGER;
      const bPrice = priceService.getLatest(b.id)?.price ?? Number.MAX_SAFE_INTEGER;
      return aPrice - bPrice;
    });

    const explanations = [
      'تقتصر الترشيحات على المنتجات المنشورة التي اجتازت التحقق.',
      profile.budget !== undefined
        ? 'تم تضمين المنتجات التي لها سعر حديث متحقق ولا يتجاوز الميزانية المدخلة.'
        : 'لم يتم تطبيق حد للميزانية لعدم إدخال ميزانية.',
      profile.occupants
        ? 'عدد أفراد المنزل محفوظ كسياق للاحتياج، لكنه لا يستخدم وحده لحساب السعة الفنية.'
        : 'لم يتم إدخال عدد أفراد المنزل.',
      ordered.length
        ? 'الترتيب حسب السعر الحديث المتحقق، وليس ترتيبًا للجودة أو الأفضلية المطلقة.'
        : 'لا توجد منتجات مستوفية لشروط التحقق والسعر في الكتالوج الحالي.',
    ];

    return { products: ordered.slice(0, 4), explanations };
  },
};

export default advisorService;
