export const getFiltersWithPrefix = (filters: any): {} => {
  const newFilters: any = {};

  for (const k in filters) {
    newFilters[`filter_${k}`] = filters[k];
  }

  return newFilters;
};
