import { QueryFunction, useInfiniteQuery } from "react-query";
import { useEffect } from "react";
import { EntityFilter } from "../types/EntityFilter";
import { PagedResult } from "../types/PagedResult";
import { useEntityContext } from "./EntityContextProvider";
import { BaseEntity } from "../types/enitities/BaseEntity";

export const useEntities = <T extends BaseEntity>(
  queryKey: string[],
  queryFn: QueryFunction<PagedResult<T>, string[]>
) => {
  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.totalItems) {
        return lastPage.offset + lastPage.limit;
      }
      return undefined;
    },
  });

  const { filters, setFilters, sortParams, setSortParams } =
    useEntityContext<T>();

  const filterEntities = async (
    entityFilters: EntityFilter[]
  ): Promise<void> => {
    const newFilters = { ...filters };

    entityFilters.forEach((filter) => {
      const { name, value } = filter;

      newFilters[name] = value;

      if (value === "" || value === undefined) {
        delete newFilters[name];
      }
    });

    setFilters(newFilters);
  };

  useEffect(() => {
    refetch();
  }, [filters, sortParams, refetch]);

  return {
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
    sortParams,
    setSortParams,
    refetch,
  };
};

export default useEntities;
