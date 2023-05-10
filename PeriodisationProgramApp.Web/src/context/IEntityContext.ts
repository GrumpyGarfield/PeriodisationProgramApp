import { BaseEntity } from "../types/enitities/BaseEntity";

export interface IEntityContext<T extends BaseEntity> {
  isFetching: boolean;
  setIsFetching(state: boolean): void;
  enitities: T[];
  setEntities(enitities: T[]): void;
  filters: any;
  setFilters(filters: any): void;
}
