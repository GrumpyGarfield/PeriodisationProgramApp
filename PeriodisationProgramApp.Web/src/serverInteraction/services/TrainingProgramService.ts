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

const liked = async ({ id, isLiked }: LikedProps) => {
  return BaseServerInteractionService.Post<TrainingProgram>(
    `/${entity}/${id}/liked`,
    {
      isLiked,
    }
  );
};

const TrainingProgramService = {
  getAll,
  liked,
};

export default TrainingProgramService;
