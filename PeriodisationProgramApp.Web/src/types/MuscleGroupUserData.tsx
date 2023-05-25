import { BaseEntity } from "./enitities/BaseEntity";

export type MuscleGroupUserData = {
  maintenanceVolume: number;
  minimumEffectiveVolume: number;
  maximumRecoverableVolume: number;
} & BaseEntity;
