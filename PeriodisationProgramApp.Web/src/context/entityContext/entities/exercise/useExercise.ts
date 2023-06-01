import { useMutation, useQueryClient } from "react-query";
import useEntity from "../../useEntity";
import useAlert from "../../../alertContext/useAlert";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useExerciseContext } from "./ExerciseContextProvider";
import { Exercise } from "../../../../types/enitities/Exercise";
import ExerciseService from "../../../../serverInteraction/services/ExerciseService";
import useLike from "../../../../hooks/useLike";
import useRate from "../../../../hooks/useRate";

const useExercise = (id: string) => {
  const entity = "exercise";
  const queryClient = useQueryClient();
  const {
    rawStimulusMagnitude,
    setRawStimulusMagnitude,
    fatigueMagnitude,
    setFatigueMagnitude,
    stimulusToFatigueRatio,
    setStimulusToFatigueRatio,
  } = useExerciseContext();

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

  const { status, data, error, isLoading, isFetching, isRefetching, refetch } =
    useEntity<Exercise>(["exercise", id], async (): Promise<Exercise> => {
      return await ExerciseService.get(id);
    });

  const { mutateAsync: mutateUpdateUserData } = useMutation(
    ExerciseService.updateUserData,
    {
      onSuccess: (exercise) => {
        queryClient.setQueryData<Exercise | undefined>(
          ["exercise", id],
          (data): Exercise | undefined => {
            if (data === undefined) {
              return data;
            }

            if (exercise.exerciseUserData == null) {
              return data;
            }

            data.exerciseUserData = exercise.exerciseUserData;
            setStimulusToFatigueRatio(
              exercise.exerciseUserData.stimulusToFatigueRatio
            );

            return data;
          }
        );
      },
      onError: (error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          showError(error.message);
        }
      },
    }
  );

  const updateUserData = async (propName: string, value: number) => {
    const data: any = {
      id,
      rawStimulusMagnitude: rawStimulusMagnitude ? rawStimulusMagnitude : 0,
      fatigueMagnitude: fatigueMagnitude ? fatigueMagnitude : 0,
    };

    data[propName] = value;

    return mutateUpdateUserData(data);
  };

  const { mutateAsync: mutateUpdate, isLoading: isUpdating } = useMutation(
    ExerciseService.update,
    {
      onSuccess: (exercise) => {
        queryClient.setQueryData<Exercise | undefined>(
          ["exercise", id],
          (data): Exercise | undefined => {
            if (data === undefined) {
              return data;
            }

            showSuccess("Saved successfully!");

            return exercise;
          }
        );
      },
      onError: (error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          showError(error.message);
        }
      },
    }
  );

  const update = async (exercise: Exercise) => {
    return mutateUpdate(exercise);
  };

  const resetToDefault = async () => {
    setRawStimulusMagnitude(data?.rawStimulusMagnitude);
    setFatigueMagnitude(data?.fatigueMagnitude);
    setStimulusToFatigueRatio(data?.stimulusToFatigueRatio);
  };

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    const rsm =
      data.exerciseUserData === null
        ? data.rawStimulusMagnitude
        : data.exerciseUserData.rawStimulusMagnitude;
    const fm =
      data.exerciseUserData === null
        ? data.fatigueMagnitude
        : data.exerciseUserData.fatigueMagnitude;
    const sfr =
      data.exerciseUserData === null
        ? data.stimulusToFatigueRatio
        : data.exerciseUserData.stimulusToFatigueRatio;

    setRawStimulusMagnitude(rsm);
    setFatigueMagnitude(fm);
    setStimulusToFatigueRatio(sfr);
  }, [
    data,
    setRawStimulusMagnitude,
    setFatigueMagnitude,
    setStimulusToFatigueRatio,
  ]);

  return {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
    rawStimulusMagnitude,
    setRawStimulusMagnitude,
    fatigueMagnitude,
    setFatigueMagnitude,
    stimulusToFatigueRatio,
    setStimulusToFatigueRatio,
    updateUserData,
    resetToDefault,
    like,
    rate,
    update,
    isUpdating,
  };
};

export default useExercise;
