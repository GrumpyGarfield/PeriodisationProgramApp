import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { IEntityContext } from "./IEntityContext";
import { BaseEntity } from "../../types/enitities/BaseEntity";
import { EntitySorting } from "../../types/EntitySorting";

const EntityContext = createContext<IEntityContext<any> | undefined>(undefined);

const useEntityContext = <T extends BaseEntity>() => {
  const context = useContext<IEntityContext<T>>(
    EntityContext as unknown as React.Context<IEntityContext<T>>
  );

  if (!context) {
    throw new Error("useEntityContext must be used within a EntityProvider");
  }
  return context;
};

const EntityProvider: FC<PropsWithChildren> = <T extends BaseEntity>(
  props: PropsWithChildren
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [enitities, setEntities] = useState<T[]>([]);
  const [filters, setFilters] = useState<{}>({});
  const [sortParams, setSortParams] = useState<EntitySorting>();
  const [optionalParams, setOptionalParams] = useState<{}>({});

  const EntityContextValue: IEntityContext<T> = {
    isFetching,
    setIsFetching,
    enitities,
    setEntities,
    filters,
    setFilters,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  };

  return <EntityContext.Provider value={EntityContextValue} {...props} />;
};

export { EntityProvider, useEntityContext };
