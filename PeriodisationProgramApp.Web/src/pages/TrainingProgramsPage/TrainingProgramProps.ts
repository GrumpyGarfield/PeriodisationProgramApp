export type TrainingProgram = {
  id: string;
  name: string;
  description?: string;
  type: string;
  numberOfSessions: number;
  trainingLevels: string[];
};
