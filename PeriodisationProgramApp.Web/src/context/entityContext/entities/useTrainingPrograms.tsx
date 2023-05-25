import { TrainingProgram } from "../../../types/enitities/TrainingProgram";
import useCommunityEntities from "./useCommunityEntities";

const useTrainingPrograms = () => {
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
    refetch,
    optionalParams,
    setOptionalParams,
    like,
    rate,
  } = useCommunityEntities<TrainingProgram>("trainingProgram");

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
    rate,
  };
};

export default useTrainingPrograms;
