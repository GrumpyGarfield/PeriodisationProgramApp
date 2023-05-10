import { TrainingLevel } from "../../enums/TrainingLevel";
import { TrainingProgramType } from "../../enums/TrainingProgramType";
import { BaseEntity } from "./BaseEntity";

export type TrainingProgram = {
  name: string;
  description?: string;
  type: TrainingProgramType;
  numberOfSessions: number;
  trainingLevel: TrainingLevel;
  rating: number;
  likes: number;
  author: string;
} & BaseEntity;
