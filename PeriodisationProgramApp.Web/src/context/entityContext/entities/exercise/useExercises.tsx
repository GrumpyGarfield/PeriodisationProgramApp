import useCommunityEntities from "../useCommunityEntities";
import { useExercisesContext } from "./ExercisesContextProvider";
import { Exercise } from "../../../../types/enitities/Exercise";
import useRemove from "../../../../serverInteraction/hooks/entity/useRemove";
import useGetAll from "../../../../serverInteraction/hooks/entity/useGetAll";

const useExercises = (offset: number = 0, limit: number = 12) => {
  const entityName = "exercise";
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
  } = useGetAll<Exercise>(
    entityName,
    offset,
    limit,
    filters,
    sortParams,
    optionalParams
  );

  const { like, rate } = useCommunityEntities<Exercise>(
    entityName,
    [
      entityName,
      JSON.stringify(filters),
      JSON.stringify(sortParams),
      JSON.stringify(optionalParams),
    ],
    optionalParams
  );
  const { remove } = useRemove(entityName, (result) => {
    result && refetch();
  });

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
    remove,
  };
};

export default useExercises;
