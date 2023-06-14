import { TrainingLevel } from "../../../enums/TrainingLevel";

export type UpdateTrainingProgramProps = {
  name: string;
  description?: string;
  numberOfSessions: number;
  trainingLevel: TrainingLevel;
  mesocycleLength: number;
  isPublic: boolean;
};
