import { NeedProfile, Product } from '../types';
import { products } from '../data/seed';
import { priceService } from './priceService';

export const advisorService = {
  recommend: (profile: NeedProfile): { products: Product[]; explanations: string[] } => {
    const budget = profile.budget ?? Number.MAX_SAFE_INTEGER;
    const filtered = products.filter((product) => {
      if (!product.published) return false;
      const matchesCategory = profile.category === 'all' || product.categoryId === profile.category;
      const latest = priceService.getLatest(product.id);
      const withinBudget = !latest || latest.price <= budget;
      return matchesCategory && withinBudget;
    });

    const ordered = filtered.sort((a, b) => {
      const aPrice = priceService.getLatest(a.id)?.price ?? Number.MAX_SAFE_INTEGER;
      const bPrice = priceService.getLatest(b.id)?.price ?? Number.MAX_SAFE_INTEGER;
      return aPrice - bPrice;
    });

    const explanations = [
      `تم أخذ الميزانية بنحو ${budget} جنيه بعين الاعتبار`,
      `تم ترتيب المنتجات حسب السعر والموثوقية`,
      profile.occupants ? `تم مراعاة عدد السكان (${profile.occupants})` : 'تمت مراجعة الاحتياج العام',
    ];

    return { products: ordered.slice(0, 4), explanations };
  },
};
