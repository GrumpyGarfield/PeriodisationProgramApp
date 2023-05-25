import { EntityFilter } from "../../types/EntityFilter";
import { EntitySorting } from "../../types/EntitySorting";
import BaseServerInteractionService from "../BaseServerInteractionService";

const getAll = async <T>(
  offset: number,
  limit?: number,
  filters?: EntityFilter[],
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
  return BaseServerInteractionService.GetPage<T>(
    `/muscleGroup/items`,
    offset,
    limit,
    filters,
    sortParams,
    optionalParams
  );
};

const MuscleGroupService = {
  getAll,
};

export default MuscleGroupService;
