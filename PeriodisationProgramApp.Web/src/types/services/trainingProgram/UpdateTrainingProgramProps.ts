import { TrainingLevel } from "../../../enums/TrainingLevel";
import { TrainingSession } from "../../enitities/TrainingSession";

export type UpdateTrainingProgramProps = {
  name: string;
  description?: string;
  numberOfSessions: number;
  trainingLevel: TrainingLevel;
  sessions: TrainingSession[];
  isPublic: boolean;
};
