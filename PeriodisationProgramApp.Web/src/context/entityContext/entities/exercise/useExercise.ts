import { Exercise } from "../../../../types/enitities/Exercise";
import { ExerciseIndexData } from "../../../../types/ExerciseIndexData";
import { useForm } from "react-hook-form";
import useGet from "../../../../serverInteraction/hooks/entity/useGet";
import useUpdateUserData from "../../../../serverInteraction/hooks/communityEntity/useUpdateUserData";
import useLike from "../../../../serverInteraction/hooks/communityEntity/useLike";
import useRate from "../../../../serverInteraction/hooks/communityEntity/useRate";
import useUpdate from "../../../../serverInteraction/hooks/entity/useUpdate";
import { UpdateExerciseProps } from "../../../../types/services/exercise/UpdateExerciseProps";
import useRemove from "../../../../serverInteraction/hooks/entity/useRemove";

const useExercise = (id: string) => {
  const entityName = "exercise";
  const { like } = useLike<Exercise>(entityName);
  const { rate } = useRate<Exercise>(entityName);
  const { update, isUpdating } = useUpdate<UpdateExerciseProps, Exercise>(
    entityName
  );
  const { remove, isRemoving } = useRemove(entityName);

  const {
    status,
    entity: exercise,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useGet<Exercise>(entityName, id);

  const parseIndexData = (
    exercise: Exercise | undefined
  ): ExerciseIndexData | undefined => {
    if (exercise === undefined) {
      return undefined;
    }

    if (exercise.exerciseUserData !== null) {
      return {
        rawStimulusMagnitude: exercise.exerciseUserData.rawStimulusMagnitude,
        fatigueMagnitude: exercise.exerciseUserData.fatigueMagnitude,
        stimulusToFatigueRatio:
          exercise.exerciseUserData.stimulusToFatigueRatio % 1 !== 0
            ? exercise.exerciseUserData.stimulusToFatigueRatio.toFixed(1)
            : exercise.exerciseUserData.stimulusToFatigueRatio.toString(),
      };
    }

    return {
      rawStimulusMagnitude: exercise.rawStimulusMagnitude,
      fatigueMagnitude: exercise.fatigueMagnitude,
      stimulusToFatigueRatio:
        exercise.stimulusToFatigueRatio % 1 !== 0
          ? exercise.stimulusToFatigueRatio.toFixed(1)
          : exercise.stimulusToFatigueRatio.toString(),
    };
  };

  const { updateUserData } = useUpdateUserData(entityName, id);

  const {
    register: registerUserData,
    handleSubmit: handleSubmitUserData,
    formState: { errors: userDataFormErrors },
  } = useForm<ExerciseIndexData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    values: parseIndexData(exercise),
  });

  const submitUserData = handleSubmitUserData(updateUserData);

  const likeExercise = (isLiked: boolean) => {
    return like(id, isLiked);
  };

  const rateExercise = (isRated: boolean, rating: number | null) => {
    return rate(id, isRated, rating);
  };

  const updateExercise = (updateProps: UpdateExerciseProps) => {
    return update(id, updateProps);
  };

  const removeExercise = () => {
    return remove(id);
  };

  return {
    status,
    exercise,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
    registerUserData,
    submitUserData,
    userDataFormErrors,
    like: likeExercise,
    rate: rateExercise,
    update: updateExercise,
    isUpdating,
    remove: removeExercise,
    isRemoving,
  };
};

export default useExercise;
