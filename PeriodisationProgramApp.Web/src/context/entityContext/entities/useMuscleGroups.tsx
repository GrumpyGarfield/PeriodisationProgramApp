import useEntities from "../useEntities";
import { PagedResult } from "../../../types/PagedResult";
import MuscleGroupService from "../../../serverInteraction/services/MuscleGroupService";
import { MuscleGroup } from "../../../types/enitities/MuscleGroup";
import { SortDirection } from "../../../enums/SortDirection";

const useMuscleGroups = () => {
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
  } = useEntities<MuscleGroup>(
    ["muscleGroup"],
    async ({ pageParam = 0 }): Promise<PagedResult<MuscleGroup>> => {
      return await MuscleGroupService.getAll<MuscleGroup>(
        pageParam,
        15,
        filters,
        sortParams === undefined
          ? { sortBy: "type", sortDir: SortDirection.Asc }
          : sortParams,
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
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
    filterMuscleGroups: filterEntities,
    filters,
    sortParams,
    setSortParams,
    refetch,
    optionalParams,
    setOptionalParams,
  };
};

export default useMuscleGroups;
