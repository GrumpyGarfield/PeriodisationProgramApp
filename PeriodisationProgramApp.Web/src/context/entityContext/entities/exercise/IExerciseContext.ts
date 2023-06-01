import { Exercise } from "../../../../types/enitities/Exercise";
import { IEntityContext } from "../../IEntityContext";

export interface IExerciseContext extends IEntityContext<Exercise> {
  rawStimulusMagnitude?: number;
  setRawStimulusMagnitude(rawStimulusMagnitude?: number): void;
  fatigueMagnitude?: number;
  setFatigueMagnitude(fatigueMagnitude?: number): void;
  stimulusToFatigueRatio?: number;
  setStimulusToFatigueRatio(stimulusToFatigueRatio?: number): void;
}
