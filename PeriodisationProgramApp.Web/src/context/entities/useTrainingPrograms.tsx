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
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    filterEntities,
    filters,
    refetch,
  } = useEntities<TrainingProgram>(
    ["trainingPrograms"],
    async ({ pageParam = 0 }): Promise<PagedResult<TrainingProgram>> => {
      return await TrainingProgramService.getAll(pageParam, 9, filters);
    }
  );

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    filterTrainingPrograms: filterEntities,
    filters,
    refetch,
  };
};

export default useTrainingPrograms;
