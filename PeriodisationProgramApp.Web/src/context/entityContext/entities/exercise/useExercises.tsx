import { useInfiniteQuery } from "react-query";
import useCommunityEntities from "../useCommunityEntities";
import CommunityEntityService from "../../../../serverInteraction/CommunityEntityInteractionService";
import { useEffect } from "react";
import { PagedResult } from "../../../../types/PagedResult";
import { useExercisesContext } from "./ExercisesContextProvider";
import { Exercise } from "../../../../types/enitities/Exercise";

const useExercises = (offset: number = 0, limit: number = 9) => {
  const entity = "exercise";
  const {
    filters,
    filterEntities,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  } = useExercisesContext();

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
      entity,
      JSON.stringify(filters),
      JSON.stringify(sortParams),
      JSON.stringify(optionalParams),
    ],
    async ({ pageParam = offset }): Promise<PagedResult<Exercise>> => {
      return await CommunityEntityService.getAll<Exercise>(
        entity,
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

  const { like, rate } = useCommunityEntities<Exercise>(entity, optionalParams);

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
    filterExercises: filterEntities,
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

export default useExercises;
