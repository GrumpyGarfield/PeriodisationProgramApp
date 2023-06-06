import { PropsWithChildren } from "react";
import { EntityFilter } from "./EntityFilter";
import { EntitySorting } from "./EntitySorting";

export type EntitiesProviderProps = {
  initialFilters?: EntityFilter[];
  initialSorting?: EntitySorting;
} & PropsWithChildren;
