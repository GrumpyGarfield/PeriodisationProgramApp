import useGet from "../../../../serverInteraction/hooks/entity/useGet";
import useLike from "../../../../serverInteraction/hooks/communityEntity/useLike";
import useRate from "../../../../serverInteraction/hooks/communityEntity/useRate";
import useUpdate from "../../../../serverInteraction/hooks/entity/useUpdate";
import useRemove from "../../../../serverInteraction/hooks/entity/useRemove";
import { TrainingProgram } from "../../../../types/enitities/TrainingProgram";
import { UpdateTrainingProgramProps } from "../../../../types/services/trainingProgram/UpdateTrainingProgramProps";

const useTrainingProgram = (id: string) => {
  const entityName = "trainingProgram";
  const { like } = useLike<TrainingProgram>(entityName);
  const { rate } = useRate<TrainingProgram>(entityName);
  const { update, isUpdating } = useUpdate<
    UpdateTrainingProgramProps,
    TrainingProgram
  >(entityName);
  const { remove, isRemoving } = useRemove(entityName);

  const {
    status,
    entity: trainingProgram,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useGet<TrainingProgram>(entityName, id);

  const likeTrainingProgram = (isLiked: boolean) => {
    return like(id, isLiked);
  };

  const rateTrainingProgram = (isRated: boolean, rating: number | null) => {
    return rate(id, isRated, rating);
  };

  const updateTrainingProgram = (updateProps: UpdateTrainingProgramProps) => {
    return update(id, updateProps);
  };

  const removeTrainingProgram = () => {
    return remove(id);
  };

  return {
    status,
    trainingProgram,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
    like: likeTrainingProgram,
    rate: rateTrainingProgram,
    update: updateTrainingProgram,
    isUpdating,
    remove: removeTrainingProgram,
    isRemoving,
  };
};

export default useTrainingProgram;
