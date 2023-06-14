import { TrainingLevel } from "../../../enums/TrainingLevel";
import { TrainingProgramType } from "../../../enums/TrainingProgramType";

export type CreateTrainingProgramProps = {
  name: string;
  description?: string;
  type: TrainingProgramType;
  numberOfSessions: number;
  trainingLevel: TrainingLevel;
  mesocycleLength: number;
  isPublic: boolean;
};
