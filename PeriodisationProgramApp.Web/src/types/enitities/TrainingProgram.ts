import { TrainingLevel } from "../../enums/TrainingLevel";
import { TrainingProgramType } from "../../enums/TrainingProgramType";
import { CommunityEntity } from "./CommunityEntity";
import { TrainingSession } from "./TrainingSession";

export type TrainingProgram = {
  name: string;
  description?: string;
  type: TrainingProgramType;
  numberOfSessions: number;
  trainingLevel: TrainingLevel;
  sessions: TrainingSession[];
} & CommunityEntity;
