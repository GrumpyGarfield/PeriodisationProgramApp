import { Exercise } from "../../types/enitities/Exercise";
import { UpdateExerciseUserDataProps } from "../../types/services/UpdateExerciseUserDataProps";
import BaseServerInteractionService from "../BaseServerInteractionService";

const get = async (id: string) => {
  return BaseServerInteractionService.Get<Exercise>(`/exercise/${id}`);
};

const updateUserData = async ({
  id,
  rawStimulusMagnitude,
  fatigueMagnitude,
}: UpdateExerciseUserDataProps) => {
  return BaseServerInteractionService.Post<Exercise>(
    `/exercise/${id}/updateUserData`,
    {
      rawStimulusMagnitude,
      fatigueMagnitude,
    }
  );
};

const update = async (exercise: Exercise) => {
  return BaseServerInteractionService.Put(`/exercise/${exercise.id}`, exercise);
};

const ExerciseService = { get, updateUserData, update };

export default ExerciseService;
