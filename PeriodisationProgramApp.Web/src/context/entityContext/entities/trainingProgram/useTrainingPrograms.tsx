import { useInfiniteQuery } from "react-query";
import { TrainingProgram } from "../../../../types/enitities/TrainingProgram";
import { useTrainingProgramsContext } from "../trainingProgram/TrainingProgramsContextProvider";
import useCommunityEntities from "../useCommunityEntities";
import { useEffect } from "react";
import { PagedResult } from "../../../../types/PagedResult";
import EntityService from "../../../../serverInteraction/services/entity/EntityInteractionService";

const useTrainingPrograms = (offset: number = 0, limit: number = 9) => {
  const entityName = "trainingProgram";
  const {
    filters,
    filterEntities,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  } = useTrainingProgramsContext();

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
    refetch,
  } = useInfiniteQuery(
    [
      entityName,
      JSON.stringify(filters),
      JSON.stringify(sortParams),
      JSON.stringify(optionalParams),
    ],
    async ({ pageParam = offset }): Promise<PagedResult<TrainingProgram>> => {
      return await EntityService.getAll<TrainingProgram>(
        entityName,
        pageParam,
        limit,
        filters,
        sortParams,
        optionalParams
      );
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.offset + lastPage.limit < lastPage.totalItems) {
          return lastPage.offset + lastPage.limit;
        }
        return undefined;
      },
    }
  );

  const { like, rate } = useCommunityEntities<TrainingProgram>(
    entityName,
    [
      entityName,
      JSON.stringify(filters),
      JSON.stringify(sortParams),
      JSON.stringify(optionalParams),
    ],
    optionalParams
  );

  useEffect(() => {
    const refetchData = async () => {
      await refetch();
    };

    refetchData();
  }, [filters, sortParams, optionalParams, refetch]);

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
