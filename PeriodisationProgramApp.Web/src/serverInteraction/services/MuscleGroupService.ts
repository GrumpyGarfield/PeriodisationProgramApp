import { EntityFilter } from "../../types/EntityFilter";
import { EntitySorting } from "../../types/EntitySorting";
import { MuscleGroup } from "../../types/enitities/MuscleGroup";
import { UpdateMuscleGroupUserDataProps } from "../../types/services/UpdateMuscleGroupUserDataProps";
import BaseServerInteractionService from "../BaseServerInteractionService";

const getAll = async (
  offset: number,
  limit?: number,
  filters?: EntityFilter[],
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
  return BaseServerInteractionService.GetPage<MuscleGroup>(
    `/muscleGroup/items`,
    offset,
    limit,
    filters,
    sortParams,
    optionalParams
  );
};

const get = async (id: string) => {
  return BaseServerInteractionService.Get<MuscleGroup>(`/muscleGroup/${id}`);
};

const updateUserData = async <MuscleGroup>({
  id,
  maintenanceVolume,
  minimumEffectiveVolume,
  maximumRecoverableVolume,
}: UpdateMuscleGroupUserDataProps) => {
  return BaseServerInteractionService.Post<MuscleGroup>(
    `/muscleGroup/${id}/updateUserData`,
    {
      maintenanceVolume,
      minimumEffectiveVolume,
      maximumRecoverableVolume,
    }
  );
};

const MuscleGroupService = {
  getAll,
  get,
  updateUserData,
};

export default MuscleGroupService;
