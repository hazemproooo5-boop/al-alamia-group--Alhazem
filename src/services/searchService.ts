export type SearchFilters = {
  term?: string;
  brand?: string;
  category?: string;
};

export const searchProducts = (items: any[], filters: SearchFilters = {}) => {
  const term = (filters.term ?? '').trim().toLowerCase();

  return items.filter((product) => {
    const matchesTerm = !term ||
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.model.toLowerCase().includes(term) ||
      product.specifications?.[Object.keys(product.specifications)[0]]?.toLowerCase()?.includes(term);

    const matchesBrand = !filters.brand || product.brandId === filters.brand;
    const matchesCategory = !filters.category || product.categoryId === filters.category;

    return matchesTerm && matchesBrand && matchesCategory;
  });
};
