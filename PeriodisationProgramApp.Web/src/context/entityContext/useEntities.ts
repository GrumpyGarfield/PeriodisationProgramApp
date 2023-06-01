import { QueryFunction, useInfiniteQuery } from "react-query";
import { useEffect } from "react";
import { PagedResult } from "../../types/PagedResult";
import { useEntitiesContext } from "./EntitiesContextProvider";
import { BaseEntity } from "../../types/enitities/BaseEntity";

export const useEntities = <T extends BaseEntity>(
  queryKey: string[],
  queryFn: QueryFunction<PagedResult<T>, string[]>
) => {
  const {
    filters,
    filterEntities,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  } = useEntitiesContext<T>();

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
      ...queryKey,
      JSON.stringify(filters),
      JSON.stringify(sortParams),
      JSON.stringify(optionalParams),
    ],
    queryFn,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.offset + lastPage.limit < lastPage.totalItems) {
          return lastPage.offset + lastPage.limit;
        }
        return undefined;
      },
    }
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
    filterEntities,
    filters,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
    refetch,
  };
};

export default useEntities;
