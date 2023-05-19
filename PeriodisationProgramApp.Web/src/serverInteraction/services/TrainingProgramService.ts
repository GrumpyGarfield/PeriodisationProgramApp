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

type LikeProps = {
  id: string;
  isLiked: boolean;
};

const like = async ({ id, isLiked }: LikeProps) => {
  return BaseServerInteractionService.Post<TrainingProgram>(
    `/${entity}/${id}/like`,
    {
      isLiked,
    }
  );
};

type RateProps = {
  id: string;
  isRated: boolean;
  rating: number | null;
};

const rate = async ({ id, isRated, rating }: RateProps) => {
  return BaseServerInteractionService.Post<TrainingProgram>(
    `/${entity}/${id}/rate`,
    {
      isRated,
      rating,
    }
  );
};

const TrainingProgramService = {
  getAll,
  like,
  rate,
};

export default TrainingProgramService;
