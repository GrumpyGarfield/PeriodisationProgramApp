import { BaseEntity } from "./enitities/BaseEntity";

export type ExerciseUserData = {
  rawStimulusMagnitude: number;
  fatigueMagnitude: number;
  stimulusToFatigueRatio: number;
} & BaseEntity;
