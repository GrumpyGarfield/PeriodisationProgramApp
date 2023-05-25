import { MuscleGroupType } from "../../enums/MuscleGroupType";
import { MuscleGroupUserData } from "../MuscleGroupUserData";
import { BaseEntity } from "./BaseEntity";

export type MuscleGroup = {
  type: MuscleGroupType;
  maintenanceVolume: number;
  minimumEffectiveVolume: number;
  maximumRecoverableVolume: number;
  maximumRecoverableVolumeMultiplicator: number;
  averageRecoveryTime: number;
  muscleGroupUserData: MuscleGroupUserData | null;
} & BaseEntity;
