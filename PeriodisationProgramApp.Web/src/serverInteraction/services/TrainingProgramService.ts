import { EntityFilter } from "../../types/EntityFilter";
import { EntitySorting } from "../../types/EntitySorting";
import { TrainingProgram } from "../../types/enitities/TrainingProgram";
import BaseServerInteractionService from "../BaseServerInteractionService";

const entity = "TrainingProgram";

const getAll = async (
  offset: number,
  limit?: number,
  filters?: EntityFilter[],
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
  return BaseServerInteractionService.GetPage<TrainingProgram>(
    `/${entity}/GetTrainingPrograms`,
    offset,
    limit,
    filters,
    sortParams,
    optionalParams
  );
};

type LikedProps = {
  id: string;
  isLiked: boolean;
};

const like = async ({ id, isLiked }: LikedProps) => {
  return BaseServerInteractionService.Post<TrainingProgram>(
    `/${entity}/${id}/like`,
    {
      isLiked,
    }
  );
};

const TrainingProgramService = {
  getAll,
  like,
};

export default TrainingProgramService;
