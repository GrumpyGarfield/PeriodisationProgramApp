import { PagedResult } from "../../../../types/PagedResult";
import MuscleGroupService from "../../../../serverInteraction/services/MuscleGroupService";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import { useQuery } from "react-query";
import { useMuscleGroupsContext } from "./MuscleGroupsContextProvider";

const useMuscleGroups = () => {
  const {
    filters,
    filterEntities,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  } = useMuscleGroupsContext();

  const { status, data, error, isLoading, isFetching, isRefetching, refetch } =
    useQuery(
      ["muscleGroups", JSON.stringify(filters), JSON.stringify(optionalParams)],
      async ({ pageParam = 0 }): Promise<PagedResult<MuscleGroup>> => {
        return await MuscleGroupService.getAll(
          pageParam,
          15,
          filters,
          sortParams,
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
    refetch,
    filters,
    filterEntities,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  };
};

export default useMuscleGroups;
