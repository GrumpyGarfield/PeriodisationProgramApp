import { EntityFilter } from "./EntityFilter";

export interface IFilter {
  clear: () => void;
  isActive: () => boolean;
  getFilter: () => EntityFilter;
}
