import { TrainingLevel } from "../../enums/TrainingLevel";
import { TrainingProgramType } from "../../enums/TrainingProgramType";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export type TrainingProgram = {
  name: string;
  description?: string;
  type: TrainingProgramType;
  numberOfSessions: number;
  trainingLevel: TrainingLevel;
  rating: number;
  userRating: number | null;
  likes: number;
  user: User;
  isLiked: boolean;
  isRated: boolean;
} & BaseEntity;
