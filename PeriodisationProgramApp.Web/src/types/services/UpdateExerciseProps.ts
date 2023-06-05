import { ExerciseType } from "../../enums/ExerciseType";
import { MuscleGroupRole } from "../../enums/MuscleGroupRole";

type UpdateExerciseMuscleGroupProps = {
  muscleGroupId: string;
  muscleGroupRole: MuscleGroupRole;
};

export type UpdateExerciseProps = {
  id: string;
  name: string;
  description?: string;
  youtubeLink?: string;
  type: ExerciseType;
  rawStimulusMagnitude: number;
  fatigueMagnitude: number;
  exerciseMuscleGroups: UpdateExerciseMuscleGroupProps[];
};
