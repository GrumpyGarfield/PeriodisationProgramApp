import { ExerciseType } from "../../../enums/ExerciseType";
import { MuscleGroupRole } from "../../../enums/MuscleGroupRole";

type CreateExerciseMuscleGroupProps = {
  muscleGroupId: string;
  muscleGroupRole: MuscleGroupRole;
};

export type CreateExerciseProps = {
  name: string;
  description?: string;
  youtubeLink?: string;
  type: ExerciseType;
  rawStimulusMagnitude?: number;
  fatigueMagnitude?: number;
  exerciseMuscleGroups: CreateExerciseMuscleGroupProps[];
  isPublic: boolean;
};
