import TrainingProgramService from "../../serverInteraction/services/TrainingProgramService";
import useEntities from "../useEntities";
import { TrainingProgram } from "../../types/enitities/TrainingProgram";
import { PagedResult } from "../../types/PagedResult";

const useTrainingPrograms = () => {
  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    filterEntities,
    filters,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
    refetch,
  } = useEntities<TrainingProgram>(
    ["trainingPrograms"],
    async ({ pageParam = 0 }): Promise<PagedResult<TrainingProgram>> => {
      return await TrainingProgramService.getAll(
        pageParam,
        9,
        filters,
        sortParams === undefined ? { sortBy: "rating" } : sortParams,
        optionalParams
      );
    }
  );

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    filterTrainingPrograms: filterEntities,
    filters,
    sortParams,
    setSortParams,
    refetch,
    optionalParams,
    setOptionalParams,
  };
};

export default useTrainingPrograms;
