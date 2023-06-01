import { MuscleGroupRole } from "../enums/MuscleGroupRole";
import { BaseEntity } from "./enitities/BaseEntity";
import { MuscleGroup } from "./enitities/MuscleGroup";

export type ExerciseMuscleGroup = {
  muscleGroup: MuscleGroup;
  muscleGroupRole: MuscleGroupRole;
} & BaseEntity;
