import { createContext, useContext, useState } from "react";
import { IEntitiesContext } from "../../IEntitiesContext";
import { EntitySorting } from "../../../../types/EntitySorting";
import { EntityFilter } from "../../../../types/EntityFilter";
import { TrainingProgram } from "../../../../types/enitities/TrainingProgram";
import { EntitiesProviderProps } from "../../../../types/EntitiesProviderProps";
import FilterHelper from "../../../../helpers/FilterHelper";

const TrainingProgramsContext = createContext<
  IEntitiesContext<TrainingProgram> | undefined
>(undefined);

const useTrainingProgramsContext = () => {
  const context = useContext<IEntitiesContext<TrainingProgram>>(
    TrainingProgramsContext as unknown as React.Context<
      IEntitiesContext<TrainingProgram>
    >
  );

  if (!context) {
    throw new Error(
      "useTrainingProgramsContext must be used within a TrainingProgramsProvider"
    );
  }
  return context;
};

const TrainingProgramsProvider = ({
  initialFilters,
  initialSorting,
  ...props
}: EntitiesProviderProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [enitities, setEntities] = useState<TrainingProgram[]>([]);
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

  const TrainingProgramsContextValue: IEntitiesContext<TrainingProgram> = {
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
    <TrainingProgramsContext.Provider
      value={TrainingProgramsContextValue}
      {...props}
    />
  );
};

export { TrainingProgramsProvider, useTrainingProgramsContext };
