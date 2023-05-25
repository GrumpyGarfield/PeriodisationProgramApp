import { MuscleGroupRole } from "../enums/MuscleGroupRole";
import { MuscleGroupType } from "../enums/MuscleGroupType";
import { BaseEntity } from "./enitities/BaseEntity";

export type ExerciseMuscleGroup = {
  muscleGroupType: MuscleGroupType;
  muscleGroupRole: MuscleGroupRole;
} & BaseEntity;
