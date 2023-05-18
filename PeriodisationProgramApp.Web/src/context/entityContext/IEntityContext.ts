import { EntitySorting } from "../../types/EntitySorting";
import { BaseEntity } from "../../types/enitities/BaseEntity";

export interface IEntityContext<T extends BaseEntity> {
  isFetching: boolean;
  setIsFetching(state: boolean): void;
  enitities: T[];
  setEntities(enitities: T[]): void;
  filters: any;
  setFilters(filters: any): void;
  sortParams?: EntitySorting;
  setSortParams(sortParams: EntitySorting | undefined): void;
  optionalParams: any;
  setOptionalParams(optionalParams: any): void;
}
