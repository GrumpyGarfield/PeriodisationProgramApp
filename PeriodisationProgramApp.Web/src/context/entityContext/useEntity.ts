import { QueryFunction, useQuery } from "react-query";
import { BaseEntity } from "../../types/enitities/BaseEntity";

export const useEntity = <T extends BaseEntity>(
  queryKey: string[],
  queryFn: QueryFunction<T, string[]>
) => {
  const { status, data, error, isLoading, isFetching, isRefetching, refetch } =
    useQuery(queryKey, queryFn);

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  };
};

export default useEntity;
