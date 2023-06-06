import { createContext, useContext, useState } from "react";
import { IEntitiesContext } from "../../IEntitiesContext";
import { EntitySorting } from "../../../../types/EntitySorting";
import { EntityFilter } from "../../../../types/EntityFilter";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import { EntitiesProviderProps } from "../../../../types/EntitiesProviderProps";
import FilterHelper from "../../../../helpers/FilterHelper";

const MuscleGroupsContext = createContext<
  IEntitiesContext<MuscleGroup> | undefined
>(undefined);

const useMuscleGroupsContext = () => {
  const context = useContext<IEntitiesContext<MuscleGroup>>(
    MuscleGroupsContext as unknown as React.Context<
      IEntitiesContext<MuscleGroup>
    >
  );

  if (!context) {
    throw new Error(
      "useMuscleGroupsContext must be used within a MuscleGroupsProvider"
    );
  }
  return context;
};

const MuscleGroupsProvider = ({
  initialFilters,
  initialSorting,
  ...props
}: EntitiesProviderProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [enitities, setEntities] = useState<MuscleGroup[]>([]);
  const [filters, setFilters] = useState<{}>(
    initialFilters ? FilterHelper.createFilters(initialFilters) : {}
  );
  const [sortParams, setSortParams] = useState<EntitySorting | undefined>(
    initialSorting
  );
  const [optionalParams, setOptionalParams] = useState<{}>({});

  const filterEntities = async (
    entityFilters: EntityFilter[]
  ): Promise<void> => {
    setFilters(FilterHelper.createFilters(entityFilters, { ...filters }));
  };

  const MuscleGroupsContextValue: IEntitiesContext<MuscleGroup> = {
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

  return (
    <MuscleGroupsContext.Provider value={MuscleGroupsContextValue} {...props} />
  );
};

export { MuscleGroupsProvider, useMuscleGroupsContext };
