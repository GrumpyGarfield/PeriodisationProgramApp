import { createContext, useContext, useState } from "react";
import { IEntitiesContext } from "../../IEntitiesContext";
import { EntitySorting } from "../../../../types/EntitySorting";
import { EntityFilter } from "../../../../types/EntityFilter";
import { Exercise } from "../../../../types/enitities/Exercise";
import { EntitiesProviderProps } from "../../../../types/EntitiesProviderProps";
import FilterHelper from "../../../../helpers/FilterHelper";

const ExercisesContext = createContext<IEntitiesContext<Exercise> | undefined>(
  undefined
);

const useExercisesContext = () => {
  const context = useContext<IEntitiesContext<Exercise>>(
    ExercisesContext as unknown as React.Context<IEntitiesContext<Exercise>>
  );

  if (!context) {
    throw new Error(
      "useExercisesContext must be used within a ExercisesProvider"
    );
  }
  return context;
};

const ExercisesProvider = ({
  initialFilters,
  initialSorting,
  ...props
}: EntitiesProviderProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [enitities, setEntities] = useState<Exercise[]>([]);
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

  const ExercisesContextValue: IEntitiesContext<Exercise> = {
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

  return <ExercisesContext.Provider value={ExercisesContextValue} {...props} />;
};

export { ExercisesProvider, useExercisesContext };
