import { EntityFilter } from "../types/EntityFilter";
import { EntitySorting } from "../types/EntitySorting";
import { LikeProps } from "../types/services/LikeProps";
import { RateProps } from "../types/services/RateProps";
import BaseServerInteractionService from "./BaseServerInteractionService";

const getAll = async <T>(
  entity: string,
  offset: number,
  limit?: number,
  filters?: EntityFilter[],
  sortParams?: EntitySorting,
  optionalParams?: any
) => {
  return BaseServerInteractionService.GetPage<T>(
    `/${entity}/items`,
    offset,
    limit,
    filters,
    sortParams,
    optionalParams
  );
};

const like = async <T>({ entity, id, isLiked }: LikeProps) => {
  return BaseServerInteractionService.Post<T>(`/${entity}/${id}/like`, {
    isLiked,
  });
};

const rate = async <T>({ entity, id, isRated, rating }: RateProps) => {
  return BaseServerInteractionService.Post<T>(`/${entity}/${id}/rate`, {
    isRated,
    rating,
  });
};

const CommunityEntityService = {
  getAll,
  like,
  rate,
};

export default CommunityEntityService;
