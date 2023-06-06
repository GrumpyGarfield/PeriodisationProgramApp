import { useMutation, useQueryClient } from "react-query";
import useEntity from "../../useEntity";
import useAlert from "../../../alertContext/useAlert";
import { AxiosError } from "axios";
import { Exercise } from "../../../../types/enitities/Exercise";
import ExerciseService from "../../../../serverInteraction/services/ExerciseService";
import useLike from "../../../../hooks/useLike";
import useRate from "../../../../hooks/useRate";
import { UpdateExerciseProps } from "../../../../types/services/UpdateExerciseProps";
import { ExerciseIndexData } from "../../../../types/ExerciseIndexData";
import { useForm } from "react-hook-form";

const useExercise = (id: string) => {
  const entity = "exercise";
  const queryClient = useQueryClient();

  const { showError, showSuccess } = useAlert();
  const { like } = useLike(entity, (exercise) => {
    queryClient.setQueryData<Exercise | undefined>(
      ["exercise", id],
      (data): Exercise | undefined => {
        if (data === undefined) {
          return data;
        }

        data.isLiked = exercise.isLiked;
        data.likes = exercise.likes;

        return data;
      }
    );
  });

  const { rate } = useRate(entity, (exercise) => {
    queryClient.setQueryData<Exercise | undefined>(
      ["exercise", id],
      (data): Exercise | undefined => {
        if (data === undefined) {
          return data;
        }

        data.isRated = exercise.isRated;
        data.rating = exercise.rating;
        data.userRating = exercise.userRating;

        return data;
      }
    );
  });

  const {
    status,
    data: exercise,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useEntity<Exercise>(["exercise", id], async (): Promise<Exercise> => {
    return await ExerciseService.get(id);
  });

  const { mutateAsync: mutateUpdateUserData } = useMutation(
    ExerciseService.updateUserData,
    {
      onSuccess: (exercise) => {
        queryClient.setQueryData<Exercise | undefined>(["exercise", id], () => {
          return exercise;
        });
      },
      onError: (error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          showError(error.message);
        }
      },
    }
  );

  const { mutateAsync: mutateUpdate, isLoading: isUpdating } = useMutation(
    ExerciseService.update,
    {
      onSuccess: (exercise) => {
        queryClient.setQueryData<Exercise | undefined>(["exercise", id], () => {
          showSuccess("Saved successfully!");
          return exercise;
        });
      },
      onError: (error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          showError(error.message);
        }
      },
    }
  );

  const update = async (exercise: UpdateExerciseProps) => {
    return mutateUpdate(exercise);
  };

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

  const onSubmitUserData = async (exerciseIndexData: ExerciseIndexData) => {
    await mutateUpdateUserData({
      id: id,
      rawStimulusMagnitude: exerciseIndexData.rawStimulusMagnitude,
      fatigueMagnitude: exerciseIndexData.fatigueMagnitude,
    });
  };

  const {
    register: registerUserData,
    handleSubmit: handleSubmitUserData,
    formState: { errors: userDataFormErrors },
  } = useForm<ExerciseIndexData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    values: parseIndexData(exercise),
  });

  const submitUserData = handleSubmitUserData(onSubmitUserData);

  return {
    status,
    exercise,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
    like,
    rate,
    update,
    isUpdating,
    registerUserData,
    submitUserData,
    userDataFormErrors,
  };
};

export default useExercise;
