import { useQuery } from "react-query";
import { BaseEntity } from "../../../types/enitities/BaseEntity";
import EntityService from "../../services/entity/EntityInteractionService";

const useGet = <T extends BaseEntity>(entityName: string, id: string) => {
  const {
    status,
    data: entity,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useQuery([entityName, id], async (): Promise<T> => {
    return await EntityService.get(entityName, id);
  });

  return {
    status,
    entity,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  };
};

export default useGet;
