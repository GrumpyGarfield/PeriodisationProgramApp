import TrainingProgramService from "../../serverInteraction/services/TrainingProgramService";
import useEntities from "../useEntities";
import { TrainingProgram } from "../../types/enitities/TrainingProgram";
import { PagedResult } from "../../types/PagedResult";
import { useMutation, useQueryClient } from "react-query";

const useTrainingPrograms = () => {
  const queryClient = useQueryClient();
  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
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

  const { mutate: like } = useMutation(TrainingProgramService.liked, {
    onSuccess: (trainingProgram) => {
      queryClient.setQueryData(["trainingPrograms"], trainingProgram);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
    filterTrainingPrograms: filterEntities,
    filters,
    sortParams,
    setSortParams,
    refetch,
    optionalParams,
    setOptionalParams,
    like,
  };
};

export default useTrainingPrograms;
