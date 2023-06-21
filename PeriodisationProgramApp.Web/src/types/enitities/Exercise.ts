import { ExerciseType } from "../../enums/ExerciseType";
import { ExerciseMuscleGroup } from "../ExerciseMuscleGroup";
import { ExerciseUserData } from "../ExerciseUserData";
import { CommunityEntity } from "./CommunityEntity";
import { MuscleGroup } from "./MuscleGroup";

export type Exercise = {
  name: string;
  description?: string;
  youtubeLink?: string;
  type: ExerciseType;
  rawStimulusMagnitude: number;
  fatigueMagnitude: number;
  stimulusToFatigueRatio: number;
  exerciseMuscleGroups: ExerciseMuscleGroup[];
  targetMuscleGroup: MuscleGroup;
  exerciseUserData: ExerciseUserData | null;
} & CommunityEntity;
