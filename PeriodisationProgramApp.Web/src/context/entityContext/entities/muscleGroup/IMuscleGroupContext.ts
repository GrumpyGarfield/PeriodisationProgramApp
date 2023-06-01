import { MuscleGroup } from "../../../../types/enitities/MuscleGroup";
import { IEntityContext } from "../../IEntityContext";

export interface IMuscleGroupContext extends IEntityContext<MuscleGroup> {
  maintenanceVolume?: number;
  setMaintenanceVolume(maintenanceVolume?: number): void;
  minimumEffectiveVolume?: number;
  setMinimumEffectiveVolume(minimumEffectiveVolume?: number): void;
  maximumRecoverableVolume?: number;
  setMaximumRecoverableVolume(maximumRecoverableVolume?: number): void;
}
