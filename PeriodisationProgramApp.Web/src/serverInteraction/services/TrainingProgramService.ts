import { EntityFilter } from "../../types/EntityFilter";
import { EntitySorting } from "../../types/EntitySorting";
import { TrainingProgram } from "../../types/enitities/TrainingProgram";
import BaseServerInteractionService from "../BaseServerInteractionService";

const getAll = async (
  offset: number,
  limit?: number,
  filters?: EntityFilter[],
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
  return BaseServerInteractionService.GetPage<TrainingProgram>(
    "/TrainingProgram/GetTrainingPrograms",
    offset,
    limit,
    filters,
    sortParams,
    optionalParams
  );
};

const TrainingProgramService = {
  getAll,
};

export default TrainingProgramService;
