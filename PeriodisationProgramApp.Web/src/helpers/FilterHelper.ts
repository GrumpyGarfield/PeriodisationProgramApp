import _ from "lodash";
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

const equals = (oldFilters: EntityFilter[], newFilters: EntityFilter[]) => {
  if (oldFilters.length !== newFilters.length) return false;
  const sortedOldFilters = oldFilters.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  const sortedNewFilters = newFilters.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  for (var i = 0; i < sortedOldFilters.length; i++) {
    if (!_.isEqual(sortedOldFilters[i], sortedNewFilters[i])) {
      return false;
    }
  }

  return true;
};

const FilterHelper = { createFilters, equals };

export default FilterHelper;
