import { TrainingLevel } from "../../enums/TrainingLevel";
import { TrainingProgramType } from "../../enums/TrainingProgramType";
import { CommunityEntity } from "./CommunityEntity";

export type TrainingProgram = {
  name: string;
  description?: string;
  type: TrainingProgramType;
  numberOfSessions: number;
  trainingLevel: TrainingLevel;
} & CommunityEntity;
