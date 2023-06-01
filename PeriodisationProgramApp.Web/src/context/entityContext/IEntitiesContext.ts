import { EntityFilter } from "../../types/EntityFilter";
import { EntitySorting } from "../../types/EntitySorting";
import { BaseEntity } from "../../types/enitities/BaseEntity";

export interface IEntitiesContext<T extends BaseEntity> {
  isFetching: boolean;
  setIsFetching(state: boolean): void;
  enitities: T[];
  setEntities(enitities: T[]): void;
  filters: any;
  filterEntities: (entityFilters: EntityFilter[]) => Promise<void>;
  sortParams?: EntitySorting;
  setSortParams(sortParams: EntitySorting | undefined): void;
  optionalParams: any;
  setOptionalParams(optionalParams: any): void;
}
