import { PropsWithChildren, createContext, useContext, useState } from "react";

import { IEntitiesContext } from "./IEntitiesContext";
import { BaseEntity } from "../../types/enitities/BaseEntity";
import { EntitySorting } from "../../types/EntitySorting";
import { EntityFilter } from "../../types/EntityFilter";

const EntitiesContext = createContext<IEntitiesContext<any> | undefined>(
  undefined
);

const useEntitiesContext = <T extends BaseEntity>() => {
  const context = useContext<IEntitiesContext<T>>(
    EntitiesContext as unknown as React.Context<IEntitiesContext<T>>
  );

  if (!context) {
    throw new Error("useEntityContext must be used within a EntityProvider");
  }
  return context;
};

type ProviderProps = {
  initialFilters?: EntityFilter[];
} & PropsWithChildren;

const EntitiesProvider = <T extends BaseEntity>({
  initialFilters,
  ...props
}: ProviderProps) => {
  const createFilters = (
    entityFilters: EntityFilter[],
    filtersObject?: any
  ) => {
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

  const [isFetching, setIsFetching] = useState(false);
  const [enitities, setEntities] = useState<T[]>([]);
  const [filters, setFilters] = useState<{}>(
    initialFilters === undefined ? {} : createFilters(initialFilters)
  );
  const [sortParams, setSortParams] = useState<EntitySorting>();
  const [optionalParams, setOptionalParams] = useState<{}>({});

  const filterEntities = async (
    entityFilters: EntityFilter[]
  ): Promise<void> => {
    const newFilters: any = { ...filters };
    setFilters(createFilters(newFilters));
  };

  const EntityContextValue: IEntitiesContext<T> = {
    isFetching,
    setIsFetching,
    enitities,
    setEntities,
    filters,
    filterEntities,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  };

  return <EntitiesContext.Provider value={EntityContextValue} {...props} />;
};

export { EntitiesProvider, useEntitiesContext };
