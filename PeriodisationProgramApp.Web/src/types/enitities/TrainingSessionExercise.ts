import { BaseEntity } from "./BaseEntity";
import { Exercise } from "./Exercise";

export type TrainingSessionExercise = {
  exercise: Exercise;
  sets: number;
  order: number;
} & BaseEntity;
