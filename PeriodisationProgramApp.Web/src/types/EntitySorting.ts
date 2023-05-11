import { SortDirection } from "../enums/SortDirection";

export type EntitySorting = {
  sortBy: string;
  sortDir?: SortDirection;
};
