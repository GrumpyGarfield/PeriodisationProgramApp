import { useMuscleGroupsContext } from "./MuscleGroupsContextProvider";
import useGetAll from "../../../../serverInteraction/hooks/entity/useGetAll";
import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";

const useMuscleGroups = (offset: number = 0, limit: number = 16) => {
  const entityName = "muscleGroup";
  const {
    filters,
    filterEntities,
    sortParams,
    setSortParams,
    optionalParams,
    setOptionalParams,
  } = useMuscleGroupsContext();

  const { status, data, error, isLoading, isFetching, isRefetching, refetch } =
    useGetAll<MuscleGroup>(
      entityName,
      offset,
      limit,
      filters,
      sortParams,
      optionalParams
    );

  const muscleGroups = data?.pages[0].items;

  return {
    status,
    data,
    muscleGroups,
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
