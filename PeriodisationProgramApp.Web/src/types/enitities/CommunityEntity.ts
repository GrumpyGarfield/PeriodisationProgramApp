import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export type CommunityEntity = {
  rating: number;
  userRating: number | null;
  likes: number;
  user: User;
  isLiked: boolean;
  isRated: boolean;
  isPublic: boolean;
} & BaseEntity;
