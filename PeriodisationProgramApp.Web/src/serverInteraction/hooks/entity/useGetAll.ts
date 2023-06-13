import { useInfiniteQuery } from "react-query";
import { BaseEntity } from "../../../types/enitities/BaseEntity";
import { EntitySorting } from "../../../types/EntitySorting";
import { PagedResult } from "../../../types/PagedResult";
import EntityService from "../../services/entity/EntityInteractionService";
import { useEffect } from "react";

const useGetAll = <T extends BaseEntity>(
  entityName: string,
  offset?: number,
  limit?: number,
  filters?: any,
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
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
    async ({ pageParam = offset ? offset : 0 }): Promise<PagedResult<T>> => {
      return await EntityService.getAll(
        entityName,
        pageParam,
        limit ? limit : 12,
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
    refetch,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
  };
};

export default useGetAll;
