import { BaseEntity } from "../../types/enitities/BaseEntity";

export interface IEntityContext<T extends BaseEntity> {
  isFetching: boolean;
  setIsFetching(state: boolean): void;
  entity: T | undefined;
  setEntity(entity: T | undefined): void;
}
