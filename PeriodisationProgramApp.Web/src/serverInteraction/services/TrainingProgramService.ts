import { TrainingProgram } from "../../types/enitities/TrainingProgram";
import BaseServerInteractionService from "../BaseServerInteractionService";

const getAll = async (
  offset: number,
  limit?: number,
  filters?: any,
  sortParams?: any
) => {
  return BaseServerInteractionService.GetPage<TrainingProgram>(
    "/TrainingProgram/GetTrainingPrograms",
    offset,
    limit,
    filters,
    sortParams
  );
};

const TrainingProgramService = {
  getAll,
};

export default TrainingProgramService;
