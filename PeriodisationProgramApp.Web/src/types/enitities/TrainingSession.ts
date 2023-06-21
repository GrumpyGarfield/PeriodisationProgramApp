import { DayOfWeek } from "../../enums/DayOfWeek";
import { BaseEntity } from "./BaseEntity";
import { TrainingSessionExercise } from "./TrainingSessionExercise";

export type TrainingSession = {
  week: number;
  dayOfWeek: DayOfWeek;
  repsInReserve: number;
  exercises: TrainingSessionExercise[];
} & BaseEntity;
