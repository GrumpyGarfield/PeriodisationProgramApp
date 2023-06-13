import { UpdateUserDataProps } from "../types/services/communityEntity/UpdateUserDataProps";
import { LikeProps } from "../types/services/communityEntity/LikeProps";
import { RateProps } from "../types/services/communityEntity/RateProps";
import BaseServerInteractionService from "./BaseServerInteractionService";

const updateUserData = async <T1, T2>({
  entityName,
  id,
  updateUserDataProps,
}: UpdateUserDataProps<T1>) => {
  return BaseServerInteractionService.Post<T2>(
    `/${entityName}/${id}/updateUserData`,
    updateUserDataProps
  );
};

const like = async <T>({ entityName, id, isLiked }: LikeProps) => {
  return BaseServerInteractionService.Post<T>(`/${entityName}/${id}/like`, {
    isLiked,
  });
};

const rate = async <T>({ entityName, id, isRated, rating }: RateProps) => {
  return BaseServerInteractionService.Post<T>(`/${entityName}/${id}/rate`, {
    isRated,
    rating,
  });
};

const CommunityEntityService = {
  updateUserData,
  like,
  rate,
};

export default CommunityEntityService;
