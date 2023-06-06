import { EntityFilter } from "../types/EntityFilter";

const createFilters = (entityFilters: EntityFilter[], filtersObject?: any) => {
  if (filtersObject === undefined) {
    filtersObject = {};
  }

  entityFilters.forEach((filter) => {
    const { name, value } = filter;

    filtersObject[name] = value;

    if (value === "" || value === undefined) {
      delete filtersObject[name];
    }
  });

  return filtersObject;
};

const FilterHelper = { createFilters };

export default FilterHelper;
